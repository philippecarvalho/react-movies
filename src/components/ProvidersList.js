import React, { useState, useEffect } from "react";
import { searchProviders } from "../utils/search";
import { imgBaseURL } from "../utils/imgBaseURL";

export function ProvidersList(props) {
  const movieID = props.movieID;
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    searchProviders(movieID).then((response) => {
      setProviders(response.data.results);
    });
  }, [movieID]);

  if (providers.BR) {
    if (providers.BR.flatrate) {
      return (
        <div className="providerList">
          {providers.BR.flatrate.map((item) => (
            <div key={item.provider_id}>
              <img
                src={`${imgBaseURL}${item.logo_path}`}
                alt={`${item.provider_name}`}
                title={`${item.provider_name}`}
              />
            </div>
          ))}
        </div>
      );
    }
  }

  return <span>Nenhum streaming disponível</span>;
}
