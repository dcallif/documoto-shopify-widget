import {
	Page,
	Layout,
	Text,
	Card,
	Button,
	Frame,
	Form,
	FormLayout,
	TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";

const EXTERNAL_API_URL = "https://documoto.digabit.com/api/ext/authorization/widget/token/v1";
const API_KEY = "Basic SUVDLU1PREVMOjk3ODA0Y2FiLWZlMmItNGQxMS1hMTJhLWY4MDIzNmVjMTc4NA==";
const identifier = "";
const type = "";

export const loader = async ({ request }) => {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json', 'Authorization': API_KEY},
		body: JSON.stringify({bindToElementById: 'documoto-container', widgetType: 'media', mediaIdentifier: '123442_936336', documotoDomain: 'https://documoto.digabit.com', locale: 'en-US', enablePartTags: true, enablePartComments: true})
	};
	const response = await fetch(EXTERNAL_API_URL, requestOptions);
	const data = await response.json();
	console.log(data);
	
	return json(data);
}

export default function PolarisForm() {
	const config = useLoaderData();
	const fetcher = useFetcher();

	const [identifier, setIdentifier] = useState("");
 	const [type, setType] = useState("");

 	const handleIdentifierChange = (value) => setIdentifier(value);
	const handleTypeChange = (value) => setType(value);
	const handleSubmit = (event) => {
		// Remove input data from fields
		setIdentifier("");
		setType("");

		const redirect_url = "/test.html?accessToken=" + config.accessToken + "&refreshToken=" + config.refreshToken + "&accessTokenExpiration=" + config.accessTokenExpiration + "&refreshTokenExpiration=" + config.refreshTokenExpiration;
		console.log(redirect_url);
		return(redirect_url);
	};
	return (
<Page
  breadcrumbs={[{ content: "Documoto Widget", url: "/widget2" }]}
  title="Documoto Widget Test Page"
  primaryAction={{ content: "Save", disabled: false, onAction: handleSubmit }}
>
  <Card sectioned>
    <Form>
      <FormLayout>
        <TextField 
          label="Media Identifier" 
          type="text"
          onChange={handleIdentifierChange}
      	  value={identifier} />
        <TextField 
          label="Widget Type (library or media)" 
          type="text"
          onChange={handleTypeChange}
      	  value={type} />
      </FormLayout>
    </Form>
  </Card>
  <Button
  accessibilityLabel="Documoto Widget"
  url={"/test.html?accessToken=" + config.accessToken + "&refreshToken=" + config.refreshToken + "&accessTokenExpiration=" + config.accessTokenExpiration + "&refreshTokenExpiration=" + config.refreshTokenExpiration}
  target="_blank"
>
  Open Widget
</Button>
</Page>
 );
}