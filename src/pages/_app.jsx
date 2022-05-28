import React from "react";
import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "providers/MoralisDappProvider/MoralisDappProvider";
import Head from "next/head";

import BaseLayout from "components/BaseLayout";

import "styles/index.css";

/** Get your free Moralis Account https://moralis.io/ */

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const isServerInfo = Boolean(APP_ID && SERVER_URL);

const Application = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Nextjs Ethereum BoilerPlate</title>
			</Head>
			<MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
				<MoralisDappProvider>
					<BaseLayout>
						<Component {...pageProps} isServerInfo={isServerInfo} />
					</BaseLayout>
				</MoralisDappProvider>
			</MoralisProvider>
		</>
	);
};

export default Application;
