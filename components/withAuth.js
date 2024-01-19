import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ConnectKitProvider, ConnectKitButton, useConnectKit } from 'connectkit';

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const connectKit = useConnectKit();

    useEffect(() => {
      // Check if user is authenticated here
      const userIsAuthenticated = connectKit.isConnected;
      setIsAuthenticated(userIsAuthenticated);

      if (!userIsAuthenticated) {
        router.push('/'); // Redirect to homepage if not authenticated
      }
    }, [connectKit]);

    return (
      <ConnectKitProvider>
        {isAuthenticated && <Component {...props} />}
        {!isAuthenticated && <ConnectKitButton />}
      </ConnectKitProvider>
    );
  };
}