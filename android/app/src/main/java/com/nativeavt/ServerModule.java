package com.nativeavt;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import fi.iki.elonen.SimpleWebServer;


public class ServerModule extends ReactContextBaseJavaModule {
    ServerModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "ServerModule";
    }
}

class Server extends 


