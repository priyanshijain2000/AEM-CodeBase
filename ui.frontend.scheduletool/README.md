# TOEFL Scheduling Wizard

This is the TOEFL test scheduling wizard component, which gets embedded into ETS's AEM application.

## Design Principles

The primary goal of this rewrite of the scheduling wizard was to improve accessibility. Thus, we took a very minimal approach regarding the use of third-party design systems or component libraries, because we wanted to have full control over the HTML structure. That makes it easier to ensure that appropriate, semantic HTML elements are being used everywhere, which is a foundational principle of accessible applications. This meant we had to hand-roll some functionality that could've been provided by third-party design systems, but it was a worthwhile trade-off, since we ended up with HTML that's easy to change without having to know the internals of any design systems.

## Architecture

Since our main dependency is React, and we avoided bringing in any external dependencies that weren't necessary, the architecture we ended up with should look familiar to any React developer. We're just using the standard declarative React pattern of building out components, and laying them out on the page.

One remarkable aspect of the design is the 'reducer' pattern coupled with the 'context' pattern, which recreates a state-management pattern approximating something like Redux/Flux (see [this blog](https://kentcdodds.com/blog/how-to-use-react-context-effectively) for a simple example). Normally this might be overkill, but for a complex form like this one, where changing one value often results in modifying others, the additional complexity is warranted, to add more structure + readability to those complex state-changes.

However, _only_ the wizard's "global" states, such as the active step, or the form-values that will end up being used to redirect the user after they finish the wizard, are managed by the global store. Other states (e.g. local states like which test-locations are expanded/collapsed, or network states) are managed by whichever component is actually using them. This keeps our store simple, and improves the performance of our application by reducing the scope of re-renders when local state changes.

## AEM Styling Considerations

Most of the AEM considerations are around styling. It's important to recognize that, since this wizard is being embedded inside AEM, the page where it's rendered will already have styles applied to it. So, we need to make sure that the styles which are already on the page don't conflict with the wizard's, and the wizard's styles don't affect the other content on the page. To that end, we wrapped the wizard inside a `div` with the `page-container` id, and wiped out all the all the external styling for all of its children using the `revert: all` CSS attribute. Then, we just have to make sure we're scoping all our styles to only affect elements inside the `page-container`. This should effectively institute two separate CSS environments, where none of our styles can affect anything outside of our wizard, and the AEM app's styles aren't affecting our wizard.

The one exception to that rule, is if the outer AEM app uses the `!important` modifier on its CSS attributes. In that case, our `revert: all` won't be applied to that attribute. As far as I know, the only place where that's happening is for button-borders, but there may be others. Unfortunately, our only recourse in that situation is to add our own `!important` modifier to the attribute we're trying to override, so you'll see that happening pretty much anywhere we're changing button-borders.

To get an idea of what the wizard will look like when the AEM app's styles are applied, you can uncomment the CSS imports from the `main.tsx` file. (Just make sure to uncomment them before you build + deploy the project.) Those files are pulled directly from the AEM site's source-code. However, there are other weird things that can happen in AEM which we can't detect just by applying those CSS files; for example, there seems to be some Javascript code in the AEM app which automatically wraps every `table` element in a `div`, which was breaking our styles for a little bit until we figured out what was going on. Probably your best bet will be to actually run a full AEM environment locally, and realistically embed the app into the page, so you're seeing how AEM will really behave. But I have no advice about how to do that; I never set up AEM locally.

## GTM Considerations

In the AEM application, there's a library that the app interacts with to fire off GTM events. To mimic that functionality, we have the same library here, but that functionality is commented out by default. To activate it, you'll need to:

- uncomment the `script` tag that imports `/src/etsAl.js` in the [`index.html`](index.html) file,
- and, in the [`etsAl.js`](src/etsAl.js) file, replace the `[GTM TOKEN HERE]` placeholder with a real GTM token.

Alternatively, this could be another good reason to just set up a local AEM environment and run the app more realistically.

## Notable dependencies

- [React](https://react.dev/): This whole wizard is built using the React framework.
- [react-select](https://react-select.com/home):
  - This is the only third-party component we're using, because it's a gigantic pain to build autocomplete-style `select` inputs using vanilla React. We vetted it for accessibility, and it's built with customization in mind.
- [react-google-places-autocomplete](https://tintef.github.io/react-google-places-autocomplete/)
  - This is another third-party component, but it's really just a wrapper around the react-select input, with some additional built-in abstractions around talking to the Google Places API.
- [react-spring](https://www.react-spring.dev/)
  - This is an animation library to help out with some of the animations that are trickier to do with vanilla CSS, like the accordion expand + collapse, or the summary panel fade-in.
- [react-query](https://tanstack.com/query/latest/)
  - This provides some reasonable default cache-settings for our network requests, and introduces a much more developer-friendly abstraction around common async patterns like errors or loading-states.

## How to run locally

- `npm install`
- `npm run dev`
- The app should now be running locally on port 3000, but it won't be able to hit the API.
- To hit the API, you'll need to make an env file called `env.development.local`, which sets the `VITE_API_BASE_URL` variable to whichever API you want to hit-- most likely the dev one, in which case you should be able to simply rename the [sample env file](.env.development.local_sample) to `.env.development.local`.

## How to build

Building the project should be as easy as running `npm run build` (or `npx vite build`, if you want to skip typechecking). That will use the env variables declared in [`.env.production`](.env.production). Build artifacts will be generated inside the `dist` directory.

One gotcha is that, for some reason, Vite seems to want to add any SVG files in the project project directory to the `dist/assets` directory alongside your JS and CSS build artifacts-- but those SVG files are actually unnecessary, because the `svgr` Vite plugin we're using just inlines those SVG files into the JS artifact on build, so nothing ends up referencing those SVG files. There's probably a way to get Vite to ignore the SVG files, but I don't feel like it's a high priority right now.

## CORS Stuff

I kept getting CORS errors when my locally-running app tried to hit the dev API, but it works from Postman, so I decided to use [cors-anywhere](https://github.com/Rob--W/cors-anywhere) as a workaround. Here's how to set it up, if you're getting CORS errors locally:

- clone the `cors-anywhere` repo
- run `npm install` in that repo
- run `node server.js` in that repo, which will get a server running on your local port 8080
- Then, in your `.env.development.local` file, you should be able to prefix your `VITE_API_BASE_URL` env variable with `http://localhost:8080/`; which, if you're using the dev API, should end up looking like [`.env.development.local_cors`](.env.development.local_cors).
- Hopefully no more CORS error!
