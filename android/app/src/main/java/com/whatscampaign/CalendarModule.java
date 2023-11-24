// CustomAccessibilityService.java
package com.whatscampaign;

import android.accessibilityservice.AccessibilityService;
import android.view.accessibility.AccessibilityEvent;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.accessibilityservice.AccessibilityServiceInfo;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactContext;

import javax.annotation.Nullable;

public class CalendarModule extends ReactContextBaseJavaModule {
    private static final String TAG = "MyAccessibilityService";
    private static ReactApplicationContext reactContext;


    public CalendarModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void onAccessibilityEvent(AccessibilityEvent event) {
        // Handle accessibility events here.
        android.util.Log.e(TAG, "onAccessibilityEvent: ");
    }

    @ReactMethod
    public void onInterrupt() {
        android.util.Log.e(TAG, "onInterrupt: Something went wrong");
    }

    @ReactMethod
        public void startService(Callback callback) {
            // Implement logic to handle the Accessibility Event here.
           //  android.util.Log.e(TAG, "onAccessibilityEvent: ");
          callback.invoke("Received callback: ");

     }

      private static void sendEvent(
        ReactContext reactContext,
        String eventName,
        @Nullable String params
       ) {
           reactContext
               .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
               .emit(eventName, params);
         }


}

//     @ReactMethod
//        protected void onServiceConnected() {
   //         super.onServiceConnected();
           // Set the type of events that this service wants to listen to. Others
           // aren't passed to this service.
//             AccessibilityEvent.TYPE_VIEW_CLICKED |
//                    AccessibilityEvent.TYPE_VIEW_FOCUSED;

           // If you only want this service to work with specific apps, set their
           // package names here. Otherwise, when the service is activated, it listens
           // to events from all apps.
   //        info.packageNames = new String[]
   //                {"com.example.android.myFirstApp", "com.example.android.mySecondApp"};

           // Set the type of feedback your service provides.
   //          AccessibilityServiceInfo.FEEDBACK_SPOKEN;

           // Default services are invoked only if no package-specific services are
           // present for the type of AccessibilityEvent generated. This service is
           // app-specific, so the flag isn't necessary. For a general-purpose service,
           // consider setting the DEFAULT flag.

           // info.flags = AccessibilityServiceInfo.DEFAULT;

   //         info.notificationTimeout = 100;
   //
   //         this.setServiceInfo(info);

//            android.util.Log.e(TAG, "onServiceConnected: ");

//        }
