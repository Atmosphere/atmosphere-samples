package org.atmosphere.samples.guice;

import com.google.inject.Inject;
import org.atmosphere.cpr.AtmosphereResourceEvent;
import org.atmosphere.cpr.AtmosphereResourceEventListener;

/**
 * @author Sebastian Lövdahl
 */
public class EventListener implements AtmosphereResourceEventListener {

    private InjectedService injectedService;

    @Inject
    void setInjectedService(InjectedService injectedService) {
        this.injectedService = injectedService;
    }

    @Override
    public void onPreSuspend( AtmosphereResourceEvent atmosphereResourceEvent ) {
        checkInjection();
    }

    @Override
    public void onSuspend( AtmosphereResourceEvent atmosphereResourceEvent ) {
        checkInjection();
    }

    @Override
    public void onResume( AtmosphereResourceEvent atmosphereResourceEvent ) {
        checkInjection();
    }

    @Override
    public void onDisconnect( AtmosphereResourceEvent atmosphereResourceEvent ) {
        checkInjection();
    }

    @Override
    public void onBroadcast( AtmosphereResourceEvent atmosphereResourceEvent ) {
        checkInjection();
    }

    @Override
    public void onThrowable( AtmosphereResourceEvent atmosphereResourceEvent ) {
        checkInjection();
    }

    @Override
    public void onClose( AtmosphereResourceEvent atmosphereResourceEvent ) {
        checkInjection();
    }

    @Override
    public void onHeartbeat( AtmosphereResourceEvent atmosphereResourceEvent ) {
        checkInjection();
    }

    private void checkInjection() {
        if (injectedService == null) {
            throw new RuntimeException("Guice injection doesn't work");
        }
    }
}
