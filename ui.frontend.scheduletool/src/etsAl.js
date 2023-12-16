;(function initEtsAL(w, d, s, l, i) {
  class EtsAnalyticsLayerGA4 {
    constructor(w, d, s, l, i) {
      this.queue = []
      this.gtmReady = false
      this.gaSessionIdPayloadIndicator = 'ga_session_id'
      this.gaClientIdPayloadIndicator = 'ga_client_id'
      this.gaSessionIdSuffix = 'SID'
      this.gaClientIdSuffix = 'CID'
      this.ga4CookieData = []
      this.gtmId = i
      this.maxRetries = 100 // Number of times we will check the dom for GTM
      this.delay = 10 //Amount of time in between checking the dom for GTM
      //bind the methods to this scope
      this.checkForGTM = this.checkForGTM.bind(this)
      this.trackClick = this.trackClick.bind(this)
      this.setGa4CookieData = this.setGa4CookieData.bind(this)
      this.push = this.push.bind(this)
      this.load = this.load.bind(this)
      //Attach an event listener to the document that waits for the load method to
      //trigger the gtm_loaded event.  This way we ensure GTM is loading before
      //we force update the values in etsAL in the window.
      d.addEventListener('gtm_downloaded', function () {
        //we create a promise that checks to see if all the things we need in the window
        //are loaded and available.
        etsAL
          .checkForGTM()
          .then((gtmFullyLoaded) => {
            //update the window
            etsAL.gtmReady = gtmFullyLoaded
            if (etsAL.gtmReady) {
              //This could be used for holding events until consent is given.
              if (etsAL.queue.length > 0) {
                console.warn('Processing Queue: Some events may have fired out of order')
                etsAL.processQueue()
              }
              //once we update the etsAL we fire an event, this can be listened to if
              //we think everything is in place and ready to push
              let _ge = new CustomEvent('gtm_loaded', { bubbles: true })
              d.dispatchEvent(_ge)
            }
          })
          .catch((e) => {
            console.error(e)
          })
      })
      const currentDomain = window.location.origin
      // var onetrustCookie = getCookie('OptanonConsent')
      // This will trigger the gtm_downloaded event (listener above) once the gtm file has been downloaded
      // and that is triggered by the load event sent when the window downloads the <script> element
      // for the GTM library.
      // if (
      //   !onetrustCookie &&
      //   (window.countryCode == 'US' ||
      //     currentDomain.includes('www-vantage-qa-publish') ||
      //     currentDomain.includes('www-vantage-dev-publish'))
      // ) {
      this.load(w, d, s, l, i)
      // } else {
      //   if (onetrustCookie.includes('C0002%3A1')) {
      //     this.load(w, d, s, l, i)
      //   }
      // }
    }
    load(w, d, s, l, i) {
      // Here we are mimicking the IIF from gtm, but now it is in this IIF's scope
      w[l] = w[l] || []
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      let f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l !== 'dataLayer' ? '&l=' + l : ''
      j.async = true
      j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl
      // Fires when google tag manager is downloaded
      j.addEventListener('load', function () {
        let _ge = new CustomEvent('gtm_downloaded', { bubbles: true })
        d.dispatchEvent(_ge)
      })
      f.parentNode.insertBefore(j, f)
    }
    async checkForGTM() {
      // The gtm_downloaded event is waiting for this promise to complete,
      // then it updates the global variable etsAL. The gtm_loaded event will
      // fire everytime checkForGTM is run
      return new Promise((resolve, reject) => {
        //we should be able to add tracking the consent approval here
        //and not let it pass until consent has been given.
        //stop checking for the variables if it times out
        let maxRetries = this.maxRetries
        const checkVar = () => {
          let gtmStarted =
            window.hasOwnProperty('dataLayer') && !!window.dataLayer.find((element) => element['gtm.start'])
          let gtmSet =
            window.hasOwnProperty('google_tag_manager') && window.google_tag_manager.hasOwnProperty(this.gtmId)
          // let ga4CookieData = this.ga4CookieData.length > 0
          if (gtmStarted && gtmSet) {
            console.log('GTM Found')
            clearTimeout(checkVar)
            resolve(true)
          } else if (maxRetries > 0) {
            console.log('GTM Not Found Checking for GTM elements Again')
            maxRetries--
            setTimeout(() => checkVar((maxRetries = maxRetries)), this.delay)
          } else {
            reject('GTM Not Loaded')
          }
        }
        // this.setGa4CookieData()
        console.log('Checking for GTM elements')
        checkVar()
      }).catch((e) => {
        console.warn(e)
      })
    }
    setGa4CookieData(maxRetries = 3, delay = 200) {
      // The cookies with _ga_XXXXXX are session cookies for each GA4 account we have connected
      // There is only 1 _ga cookie and that contains the clientId
      // We use the additional fields added here to pass the session ids to the correct GA4 accounts via GTM.
      // Since we need this cookie data we use this as one of the checks for checkForGTM
      let cookies = []
      let sessionGaPattern = /_ga_[^; ]+/g
      let gaSessionCookies = document.cookie.match(sessionGaPattern)
      let clientIdCookie = getCookie('_ga')
      let gaClientId = !!clientIdCookie ? clientIdCookie.substring(6) : false
      let cookiesReady = !!gaSessionCookies && !!gaClientId && !!gaSessionCookies.length > 0
      if (!cookiesReady) {
        window.setTimeout(() => this.setGa4CookieData(maxRetries--, delay))
      } else {
        for (let i = 0; i < gaSessionCookies.length; i++) {
          let parts = gaSessionCookies[i].split('.')
          cookies.push({ ga4AccountId: parts[0].slice(4, -4), sessionId: parts[2], clientId: gaClientId })
        }
      }
      this.ga4CookieData = cookies
    }
    supplementWithCookieInfo(payload) {
      // To invoke this feature you must put the value of: this.gaSessionIdPayloadIndicator = 'ga_session_id';
      // and this.gaClientIdPayloadIndicator = 'ga_client_id' in the push {payload};
      // It will then add the sessionId and clientId to the payload before we update the dataLayer
      let cookieData = this.ga4CookieData
      let replaceSIndicator = payload.hasOwnProperty(this.gaSessionIdPayloadIndicator)
      let replaceCIndicator = payload.hasOwnProperty(this.gaClientIdPayloadIndicator)
      //For every GA4 account connected create the dLV variable mappings
      for (let i = 0; i < cookieData.length; i++) {
        let cookie = cookieData[i]
        if (replaceSIndicator) {
          let cookieSessionIdName = '_ga_' + cookie.ga4AccountId + '_' + this.gaSessionIdSuffix
          payload[cookieSessionIdName] = cookie.sessionId
        }
        if (replaceCIndicator) {
          let cookieClientIdName = '_ga_' + cookie.ga4AccountId + '_' + this.gaClientIdSuffix
          payload[cookieClientIdName] = cookie.clientId
        }
      }
      // Remove the placeholders in our original payload
      if (replaceCIndicator) {
        delete payload[this.gaClientIdPayloadIndicator]
      }
      if (replaceSIndicator) {
        delete payload[this.gaSessionIdPayloadIndicator]
      }
      // return the updated payload
      return payload
    }
    push(payload) {
      //if this.gaSessionIdPayloadIndicator or this.gaClientIdPayloadIndicator are in
      //the payload that means we need to supplement the payload with a class method
      let sid = !!payload.hasOwnProperty(this.gaSessionIdPayloadIndicator)
      let cid = !!payload.hasOwnProperty(this.gaClientIdPayloadIndicator)
      let supplementCookieData = !!sid || !!cid
      //if we have passed our checks before pushing.. a.k.a waitng for the gtm_loaded event
      //our events will fire rigt away, otherwise they will be put in a queue until the check
      ///checkForGTM is run again, which will trigger the gtm_loaded event if everything
      //is in place and process the queue of events pushed prior to either consent approval
      //or a loading issue etc.
      if (this.gtmReady && supplementCookieData) {
        const p = this.supplementWithCookieInfo(payload)
        return window.dataLayer.push(p)
      } else if (this.gtmReady) {
        return window.dataLayer.push(payload)
      } else {
        this.queue.push(payload)
      }
    }
    processQueue() {
      //if we enable add "consent tracking" we can pool events in the queue and
      //only send them when we get consent by running checkForGTM on this class instance again
      while (this.queue.length > 0) {
        const event = this.queue.shift()
        console.warn(event)
        console.warn(event.payload)
        this.push(event)
      }
    }
    trackClick(e) {
      let ds = JSON.parse(JSON.stringify(e.target.dataset))
      this.push(ds)
      console.log('trackClick', ds);
    }
    trackLearnMoreClick(e) {
      let currentEle = e.target
      if (currentEle.nodeName == 'SPAN') {
        currentEle = currentEle.parentNode
      }
      let ds = {
        event: 'learn_more_click',
        topic_name: currentEle.ariaLabel,
        brand: 'TOEFL',
        custom_timestamp: Date.now(),
      }
      window.dataLayer.push(ds)
      console.log('trackLearnMoreClick', ds);
    }
  }
  w.etsAL = new EtsAnalyticsLayerGA4(w, d, s, l, i)
})(window, document, 'script', 'dataLayer', '[GTM TOKEN HERE]')

document.addEventListener('DOMContentLoaded', function () {
  let etsAlClickElements = document.querySelectorAll('[data-etsal]')
  for (let i = 0; i < etsAlClickElements.length; i++)
    etsAlClickElements[i].addEventListener('click', etsAL.trackClick, true)
})
