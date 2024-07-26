import { useLoaderData, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";

import {
	Page,
	Layout,
	Text,
	Card,
	Button,
	DataTable,
	Thumbnail,
	Frame,
	Spinner,
} from "@shopify/polaris"

const EXTERNAL_API_URL = "https://documoto.digabit.com/api/ext/authorization/widget/token/v1"
const API_KEY = "Basic SUVDLU1PREVMOjk3ODA0Y2FiLWZlMmItNGQxMS1hMTJhLWY4MDIzNmVjMTc4NA=="

export const loader = async () => {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json', 'Authorization': API_KEY},
		body: JSON.stringify({bindToElementById: 'documoto-container', widgetType: 'media', mediaIdentifier: '123442_936336', documotoDomain: 'https://documoto.digabit.com', locale: 'en-US', enablePartTags: true, enablePartComments: true})
	};

	const response = await fetch(EXTERNAL_API_URL, requestOptions)
	const data = await response.json()
	console.log(data)

	return json(data)
}

export default function ExternalProducts() {
	const config = useLoaderData()
	const fetcher = useFetcher()

	const rows = [
		[config.bindToElementById, config.widgetType, config.mediaIdentifier, config.documotoDomain, config.locale, "true", "true", config.accessToken, config.refreshToken]
		]

	return(<Frame>
		<Page fullWidth title="Documoto Widget Authenticator">
			<Layout>
				<Layout.Section>
					<Card>
						<Text as="h2" variant="headingMd">
							Returned Authentication Information
						</Text>
						{fetcher.state === "loading" ? (
							  <Spinner />
							) : (
							  <DataTable
							  	columnContentTypes={["text", "text", "text", "text", "text", "text", "text", "text", "text"]}
							  	headings={["bindToElementById", "widgetType", "mediaIdentifier", "documotoDomain", "locale", "enablePartTags", "enablePartComments", "accessToken", "refreshToken"]}
							  	rows={rows}
							  />
							)}
					</Card>,
					<Button
  accessibilityLabel="Documoto Widget"
  url={"/test.html?accessToken=" + config.accessToken + "&refreshToken=" + config.refreshToken + "&accessTokenExpiration=" + config.accessTokenExpiration + "&refreshTokenExpiration=" + config.refreshTokenExpiration}
  target="_blank"
>
  Open Widget
</Button>
				</Layout.Section>
			</Layout>
		</Page>
	</Frame>)
}
