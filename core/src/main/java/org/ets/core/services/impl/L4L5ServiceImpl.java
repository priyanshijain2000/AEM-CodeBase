package org.ets.core.services.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.AssetManager;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.apache.sling.api.resource.ResourceResolver;
import org.ets.core.bean.HeaderSchema;
import org.ets.core.services.L4L5Service;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.*;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Component(service = L4L5Service.class, immediate = true)
public class L4L5ServiceImpl implements L4L5Service {

    private static final String MIME_TYPE = "application/json";
    private static final Logger log = LoggerFactory.getLogger(L4L5ServiceImpl.class);
    private final Map<String, List<HeaderSchema>> l4l5NavigationContainerMap = new HashMap<>();

    //Get l4l5Json items
    @Override
    public void getL4L5Items(Page parentPage, ResourceResolver resourceResolver, String jsonStorageDirectory, String jsonFileName) {
        try {
            l4l5NavigationContainerMap.clear();
            Iterator<Page> l4l5PageList = parentPage.listChildren();
            List<HeaderSchema> l4l5List = new ArrayList<>();
            while (l4l5PageList.hasNext()) {
                Page l4l5Page = l4l5PageList.next();
                List<HeaderSchema> l4List = new ArrayList<>();
                HeaderSchema l4l5Data = new HeaderSchema();
                l4l5Data = getHeaderSchemaData(l4l5Data, l4l5Page);
                if (l4l5Page.listChildren().hasNext()) {
                    getFourthNavItems(l4l5Page, l4List);
                    l4l5Data.setFourthLevelNavigationContainer(l4List);
                }
                l4l5List.add(l4l5Data);
            }
            l4l5NavigationContainerMap.put("l4l5NavigationContainer", l4l5List);
            storeJsonInJcr(l4l5NavigationContainerMap, resourceResolver, jsonStorageDirectory, jsonFileName);
        }catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    //Fetching fourthLevelNavigationContainer items
    private void getFourthNavItems(Page l4l5Page, List<HeaderSchema> l4List) {
        try {
            Iterator<Page> l4PageList = l4l5Page.listChildren();
            while (l4PageList.hasNext()) {
                List<HeaderSchema> l5List = new ArrayList<>();
                HeaderSchema l4Data = new HeaderSchema();
                Page l4Page = l4PageList.next();
                l4Data = getHeaderSchemaData(l4Data, l4Page);
                if (l4Page.listChildren().hasNext()) {
                    getFifthNavItems(l4Page, l5List);
                    l4Data.setFifthLevelNavigationContainer(l5List);
                }
                l4List.add(l4Data);
            }
        }catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    //Fetching fifthLevelNavigationContainer items
    private void getFifthNavItems(Page l4Page, List<HeaderSchema> l5List) {
        try {
            Iterator<Page> l5PageList = l4Page.listChildren();
            while (l5PageList.hasNext()) {
                HeaderSchema l5Data = new HeaderSchema();
                Page l5NavPage = l5PageList.next();
                l5Data = getHeaderSchemaData(l5Data, l5NavPage);
                l5List.add(l5Data);
            }
        }catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }
    }

    //Getting properties of every page and setting them to a bean class
    private HeaderSchema getHeaderSchemaData(HeaderSchema hs, Page firstNavPage) throws RepositoryException {

        Node firstNavNode = firstNavPage.adaptTo(Node.class);
        if (firstNavNode.hasNode(JcrConstants.JCR_CONTENT)) {
            Node navPageNode = firstNavNode.getNode(JcrConstants.JCR_CONTENT);

            if(navPageNode.hasProperty("titleSia")){
                hs.setTitle(navPageNode.getProperty("titleSia").getValue().getString());
            }

            if(navPageNode.hasProperty("deviceDisplay")){
                hs.setDeviceDisplay(getStringArrayValues(navPageNode.getProperty("deviceDisplay")));
            }

            //Creating linkTypeContainer Map with link and targetType property
            String link, targetType;
            Map linkType = new HashMap<>();
            if(navPageNode.hasProperty("link")){
                link = navPageNode.getProperty("link").getValue().getString();
                linkType.put("link", link);
            }

            if(navPageNode.hasProperty("targetType")){
                targetType = navPageNode.getProperty("targetType").getValue().getString();
                linkType.put("targetType",targetType);
            }

            if(!linkType.isEmpty()) {
                hs.setLinkTypeContainer(linkType);
            }

            if(navPageNode.hasProperty("linkImage")){
                hs.setLinkImage(navPageNode.getProperty("linkImage").getValue().getString());
            }

            if(navPageNode.hasProperty("expirationDate")){
                hs.setExpirationDate(navPageNode.getProperty("expirationDate").getValue().getString());
            }

            if(navPageNode.hasProperty("viewType")){
                hs.setViewType(navPageNode.getProperty("viewType").getValue().getString());
            }

            if(navPageNode.hasProperty("travelType")){
                hs.setTravelType(navPageNode.getProperty("travelType").getValue().getString());
            }

            if(navPageNode.hasNode("displayItems")) {
                List<String> userDisplayValues= new ArrayList<>();
                Node userDisplayNode = navPageNode.getNode("displayItems");
                Iterator<Node> userDisplayItems = userDisplayNode.getNodes();
                while(userDisplayItems.hasNext()) {
                    Node userDisplayItem = userDisplayItems.next();
                    userDisplayValues.add(userDisplayItem.getProperty("userDisplay").getValue().getString());
                }
                hs.setUserDisplay(userDisplayValues);
            }

            if(navPageNode.hasNode("countryList")) {
                List<String> allowedCountriesValues = new ArrayList<>();
                Node allowedCountriesNode = navPageNode.getNode("countryList");
                Iterator<Node> allowedCountriesItems = allowedCountriesNode.getNodes();
                while(allowedCountriesItems.hasNext()) {
                    Node allowedCountriesItem = allowedCountriesItems.next();
                    allowedCountriesValues.add(allowedCountriesItem.getProperty("allowedCountries").getValue().getString());
                }
                hs.setAllowedCountry(allowedCountriesValues);
            }

            if(navPageNode.hasProperty("country")){
                hs.setCountry(navPageNode.getProperty("country").getValue().getString());
            }
        }
        return hs;
    }

    private String getStringArrayValues(Property stringArrayProperty) throws RepositoryException{
        List<String> propertyAsList = new ArrayList<>();
        String deviceDisplayValue;
        if(stringArrayProperty.isMultiple()){
            Value[] arrayValues = stringArrayProperty.getValues();
            for (Value value : arrayValues) {
                propertyAsList.add(value.getString());
            }
            deviceDisplayValue = String.join(",",propertyAsList);
        }
        else {
            deviceDisplayValue = stringArrayProperty.getValue().getString();
        }

        return deviceDisplayValue;
    }

    //Creating Header JSON and store the file in DAM
    private void storeJsonInJcr(Map<String, List<HeaderSchema>> l4l5NavigationContainerMap, ResourceResolver resourceResolver, String jsonStorageDirectory, String jsonFileName) {
        try {
            AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);
            Session session = resourceResolver.adaptTo(Session.class);
            Gson gson = new Gson();
            String uglyJsonString = gson.toJson(l4l5NavigationContainerMap);
            Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
            JsonElement je = JsonParser.parseString(uglyJsonString);
            String prettyJsonString = prettyGson.toJson(je);
            ValueFactory valueFactory = null;
            Binary binary = null;
            InputStream jsonInputStream = new ByteArrayInputStream(prettyJsonString.getBytes(StandardCharsets.UTF_8));
            valueFactory = session.getValueFactory();
            binary = valueFactory.createBinary(jsonInputStream);
            if (Objects.nonNull(assetManager)) {
                assetManager.createOrUpdateAsset(
                        jsonStorageDirectory.concat("/".concat(jsonFileName)),
                        binary,
                        MIME_TYPE,
                        true);
            } else {
                log.error("Asset Manager Object is NULL");
            }
        }catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }catch (UnsupportedOperationException e) {
            log.error("Unsupported Operation Exception {}", e.getMessage());
        }
    }
}
