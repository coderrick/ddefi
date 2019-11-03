/*
This is an example snippet - you should consider tailoring it
to your service.
*/
/*
Add these to your `package.json`:
  "node-fetch": "^2.5.0"
*/

// Node doesn't implement fetch so we have to import it
import fetch from "node-fetch";

function fetchGraphQL(operationsDoc, operationName, variables) {
  return fetch(
    "http://graphql.o1test.net/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  ).then((result) => result.json());
}

const operationsDoc = `
  query MyQuery {
    trustStatus(ipAddress: "") {
      banned_status
      ip_addr
    }
    trustStatusAll {
      banned_status
      ip_addr
      trust
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(
    operationsDoc,
    "MyQuery",
    {}
  );
}

fetchMyQuery().then(({ data, errors }) => {
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
});