package com.uqamnativeclient;

import android.content.Context;
import android.content.SharedPreferences;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by janic on 15-12-25.
 */
public class NotificationsModule extends ReactContextBaseJavaModule {
    public static final String KEY_CODE = "KEY_CODE";
    public static final String KEY_NIP = "KEY_NIP";

    public static class Credentials {
        public String code;
        public String nip;
    }

    public NotificationsModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "Notifications";
    }

    @ReactMethod
    public void register(String code, String nip) {
        Credentials credentials = new Credentials();
        credentials.code = code;
        credentials.nip = nip;
        setCredentials(getReactApplicationContext(), credentials);
    }

    @ReactMethod
    public void unregister() {
        setCredentials(getReactApplicationContext(), null);
    }

    public static @Nullable Credentials getCredentials(Context ctx) {
        SharedPreferences preferences = ctx.getSharedPreferences(NotificationsModule.class.getName(), Context.MODE_PRIVATE);
        if (!preferences.contains(KEY_CODE) || !preferences.contains(KEY_NIP)) {
            return null;
        }
        Credentials res = new Credentials();
        res.code = preferences.getString(KEY_CODE, null);
        res.nip = preferences.getString(KEY_NIP, null);
        return res;
    }

    public static void setCredentials(Context ctx, @Nullable Credentials credentials) {
        SharedPreferences preferences = ctx.getSharedPreferences(NotificationsModule.class.getName(), Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        if (credentials == null) {
            editor.remove(KEY_CODE);
            editor.remove(KEY_NIP);
        } else {
            editor.putString(KEY_CODE, credentials.code);
            editor.putString(KEY_NIP, credentials.nip);
        }
        editor.apply();
    }
}
