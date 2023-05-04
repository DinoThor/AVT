package com.nativeavt;

import android.content.Context;
import android.content.res.AssetManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.koushikdutta.async.http.server.AsyncHttpServer;
import com.koushikdutta.async.http.server.AsyncHttpServerRequest;
import com.koushikdutta.async.http.server.AsyncHttpServerResponse;
import com.koushikdutta.async.http.server.HttpServerRequestCallback;
import java.io.IOException;
import java.io.InputStream;

public class ServerModule extends ReactContextBaseJavaModule {
    Context context;
    String html;
    AsyncHttpServer server = new AsyncHttpServer();

    ServerModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
        html = readFile();
    }

    @Override
    public String getName() {
        return "ServerModule";
    }

    private String readFile() {
        AssetManager assetManager = this.context.getAssets();
        String res = "Not found";
        InputStream stream;
        try {
            stream = assetManager.open("index.html");
            int size = stream.available();
            byte[] buffer = new byte[size];
            stream.read(buffer);
            stream.close();

            res = new String(buffer);
        }
        catch (IOException e) {
            System.err.println(e.getMessage());
        }
        return res;
    }

    @ReactMethod
    public void createServer() {
        server.get("/", new HttpServerRequestCallback() {
            @Override
            public void onRequest(AsyncHttpServerRequest request, AsyncHttpServerResponse response) {
                response.send(html);
            }
        });
        server.listen(5000);
    }

    @ReactMethod
    public void closeServer() { server.stop(); }
}
