import React, { useState, useEffect } from "react";
import { searchProviders } from "../services/search";

export function ProvidersList(props) {
  const imgBaseURL = "https://image.tmdb.org/t/p/original/";

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
            <div>
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
