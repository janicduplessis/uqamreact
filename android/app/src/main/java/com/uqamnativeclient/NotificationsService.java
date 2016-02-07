package com.uqamnativeclient;

import android.app.IntentService;
import android.content.Intent;
import android.content.Context;

import java.net.HttpURLConnection;
import java.net.URL;

public class NotificationsService extends IntentService {

    public static final String ACTION_CHECK = "ACTION_CHECK";

    public NotificationsService() {
        super("NotificationsService");
    }

    public static void startActionCheck(Context context, String param1, String param2) {
        Intent intent = new Intent(context, NotificationsService.class);
        intent.setAction(ACTION_CHECK);
        context.startService(intent);
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        if (intent != null && ACTION_CHECK.equals(intent.getAction())) {
            checkNotifications();
        }
    }

    private void checkNotifications() {
        NotificationsModule.Credentials credentials = NotificationsModule.getCredentials(getApplicationContext());
        if (credentials == null) {
            return;
        }
        //URL url = new URL("https://mobile.uqam.ca/portail_etudiant/proxy_resultat.php?");
        //HttpURLConnection connection = url.openConnection();
        //connection.setRequestMethod("POST");
        //connection.addRequestProperty();
    }
}
