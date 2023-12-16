package org.ets.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.apache.sling.models.factory.ModelFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith({ AemContextExtension.class, MockitoExtension.class })
class VideoListModelTest {

	static final String RESOURCE_PATH = "/org/ets/core/models/VideoListModelResource.json";

	static final String CURRENT_RESOURCE_PATH = "/content/videoList";

	static final String ROOT_PATH = "/content";

	private AemContext context = new AemContext();

	@Mock
	private ModelFactory modelFactory;

	VideoListModel videoListModel;

	@BeforeEach
	public void setUp() throws Exception {
		context.addModelsForClasses(VideoListModel.class);
		context.load().json(RESOURCE_PATH, ROOT_PATH);
		context.registerService(ModelFactory.class, modelFactory, org.osgi.framework.Constants.SERVICE_RANKING,
				Integer.MAX_VALUE);
	}

	@Test
	void testDetails() {
		context.currentResource(CURRENT_RESOURCE_PATH);
		videoListModel = context.request().adaptTo(VideoListModel.class);
		assertNotNull(videoListModel);
		assertNotNull(videoListModel.getAltText());
		assertNotNull(videoListModel.getCloseButtonAriaLabel());
		assertNotNull(videoListModel.getLink());
		assertNotNull(videoListModel.getModalAriaLabel());
		assertNotNull(videoListModel.getNewTab());
		assertNotNull(videoListModel.getText());
		assertNotNull(videoListModel.getThumbnail());
		assertNotNull(videoListModel.getUrl());
		assertNotNull(videoListModel.getVideoAriaLabel());
		assertNotNull(videoListModel.getVideoid());
		assertNotNull(videoListModel.getVideoPath());
		assertNotNull(videoListModel.getVideoType());
	}
}