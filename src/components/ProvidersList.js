import React, { useState, useEffect } from "react";

export function ProvidersList(props) {
  const imgBaseURL = "https://image.tmdb.org/t/p/original/";

  const movieID = props.movieID;
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProvider = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=450bf04edaaa49ba73752463a5e7270d`
      );
      const data = await response.json();
      setProviders(data.results);
    };

    fetchProvider();
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
