import {gql} from "apollo-boost";
import React from "react";
import {useQuery} from "@apollo/react-hooks";

const TEST_QUERY = gql`query { testField {
    testField
    errors
}
}`;

export default function TestData() {
    const result = useQuery(TEST_QUERY);
    console.log(`RESULT ${result}`)
    const {loading, error, data} = result

    if (loading) {
        return (
            <div>'Loading'</div>
        );
    } else if (error) {
        return (
            <div>Something went wrong {error.message}</div>
        );
    } else {
        return (
          <div>
              <p>{data.testField?.testField}</p>
              <p>{data.testField?.errors}</p>
          </div>
        );
    }
}
