package org.ets.core.services.impl;

import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.dam.api.AssetManager;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.ets.core.bean.HeaderSchema;
import org.ets.core.services.SIAHeaderService;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.*;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Component(service = SIAHeaderService.class, immediate = true)
public class SIAHeaderServiceImpl implements SIAHeaderService {
    private static final String MIME_TYPE = "application/json";
    private static final Logger log = LoggerFactory.getLogger(SIAHeaderServiceImpl.class);
    private final Map<String, List<HeaderSchema>> firstLevelNavigationContainerMap = new HashMap<>();
    private final Map<String, Map<String,List<HeaderSchema>>> headerDataMap = new HashMap<>();

    @Reference
    private ResourceResolverFactory resolverFactory;

    //Get headerJson items
    @Override
    public void getFirstNavItems(Page parentPage, ResourceResolver resourceResolver, String jsonStorageDirectory, String jsonFileName) {
        try {
            firstLevelNavigationContainerMap.clear();
            headerDataMap.clear();
            Iterator<Page> firstNavList = parentPage.listChildren();
            List<HeaderSchema> arrayList1 = new ArrayList<>();
            //Fetching firstLevelNavigationContainer items
            while (firstNavList.hasNext()) {
                List<HeaderSchema> arrayList2 = new ArrayList<>();
                HeaderSchema hs1 = new HeaderSchema();
                Page firstNavPage = firstNavList.next();
                if (firstNavPage.getProperties().get("disablePage", String.class).equals("false")) {
                    hs1 = getHeaderSchemaData(hs1, firstNavPage);
                    if (firstNavPage.listChildren().hasNext()) {
                        getSecondNavItems(firstNavPage, arrayList2);
                        hs1.setSecondLevelNavigationContainer(arrayList2);
                    }
                    arrayList1.add(hs1);
                }
            }
            firstLevelNavigationContainerMap.put("firstLevelNavigationContainer", arrayList1);
            headerDataMap.put("headerData", firstLevelNavigationContainerMap);
            storeJsonInJcr(headerDataMap, resourceResolver, jsonStorageDirectory, jsonFileName);
        }catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }catch (NullPointerException e) {
            log.error("Null Pointer Exception {}", e.getMessage());
        }
    }

    //Fetching secondLevelNavigationContainer items
    private void getSecondNavItems(Page firstNavPage, List<HeaderSchema> arrayList2) {
        try {
            Iterator<Page> secondNavList = firstNavPage.listChildren();
            while (secondNavList.hasNext()) {
                List<HeaderSchema> arrayList3 = new ArrayList<>();
                HeaderSchema hs2 = new HeaderSchema();
                Page secondNavPage = secondNavList.next();
                if(secondNavPage.getProperties().get("disablePage",String.class).equals("false")) {
                    hs2 = getHeaderSchemaData(hs2, secondNavPage);
                    if (secondNavPage.listChildren().hasNext()) {
                        getThirdNavItems(secondNavPage, arrayList3);
                        hs2.setThirdLevelNavigationContainer(arrayList3);
                    }
                    arrayList2.add(hs2);
                }
            }
        }catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }catch (NullPointerException e) {
            log.error("Null Pointer Exception {}", e.getMessage());
        }
    }

    //Fetching thirdLevelNavigationContainer items
    private void getThirdNavItems(Page secondNavPage, List<HeaderSchema> arrayList3) {
        try{
            Iterator<Page> thirdNavList = secondNavPage.listChildren();
            while (thirdNavList.hasNext()) {
                HeaderSchema hs3 = new HeaderSchema();
                Page thirdNavPage = thirdNavList.next();
                if(thirdNavPage.getProperties().get("disablePage",String.class).equals("false")) {
                    hs3 = getHeaderSchemaData(hs3, thirdNavPage);
                    arrayList3.add(hs3);
                }
            }
        }catch (RepositoryException e) {
            log.error("Repository Exception {}", e.getMessage());
        }catch (NullPointerException e) {
            log.error("Null Pointer Exception {}", e.getMessage());
        }
    }

    //Getting properties of every page and setting them to a bean class
    private HeaderSchema getHeaderSchemaData(HeaderSchema hs, Page firstNavPage) throws RepositoryException, NullPointerException {

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

    private String getStringArrayValues(Property stringArrayProperty) throws RepositoryException, NullPointerException{
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
    private void storeJsonInJcr(Map<String, Map<String, List<HeaderSchema>>> headerDataMap, ResourceResolver resourceResolver, String jsonStorageDirectory, String jsonFileName) {
        try {
            AssetManager assetManager = resourceResolver.adaptTo(AssetManager.class);
            Session session = resourceResolver.adaptTo(Session.class);
            Gson gson = new Gson();
            String uglyJsonString = gson.toJson(headerDataMap);
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
        }catch (NullPointerException e) {
            log.error("Null Pointer Exception {}", e.getMessage());
        }catch (UnsupportedOperationException e) {
            log.error("Unsupported Operation Exception {}", e.getMessage());
        }
    }

}
