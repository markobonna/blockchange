import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.INFURA_ID,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,
    appName: "BlockChange",
  })
);

export default function App({ Component, pageProps: { ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          {getLayout(
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  );
}
