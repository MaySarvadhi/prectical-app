import "./Home.css";

import React, { useEffect, useState } from "react";

import FetchDataApi from "../../http/FetchDataApi";
import { Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const [countries, setCountries] = useState([]);
  const [tempCountries, setTempCountries] = useState([]);
  const [columns, setColumns] = useState<any>([]);

  const getAllCountries = async () => {
    const countriesData: any = localStorage.getItem("countries");
    const mainData = JSON.parse(countriesData);
    if (mainData) {
      setColumns(Object.keys(mainData[0]));
      setCountries(mainData);
      setTempCountries(mainData);
    } else {
      const results: any = await FetchDataApi.getAllCountries();
      const countriesArray = results.map((country: any) => {
        return {
          name: country.name,
          population: country.population,
          latlng: country.latlng,
          capital: country.capital,
          flag: country.flag,
          borders: country.borders,
          timezones: country.timezones,
          languages: country.languages,
          currencies: country.currencies,
        };
      });
      setColumns(Object.keys(countriesArray[0]));
      localStorage.setItem("countries", JSON.stringify(countriesArray));
      setCountries(countriesArray);
      setTempCountries(countriesArray);
    }
  };

  const onTextChange = (text: string) => {
    let newArray = tempCountries.filter((d: any) => {
      let searchValue = d.name.toLowerCase();
      let searchCapital = d.capital.toLowerCase();
      return searchValue.indexOf(text.toLowerCase()) !== -1 || searchCapital.indexOf(text.toLowerCase()) !== -1; 
    });
    setCountries(newArray);
  };

  useEffect(() => {
    getAllCountries();
  }, []);
  return (
    <div>
      <div className="react-excel">
        <div className="container my-4">
          <div className="row">
            <div className="col-md-4 offset-md-8">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Search"
                  onChange={(e) => onTextChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <table className="table">
          <tr>
            {columns.map((column: any) => {
              if (
                column !== "borders" &&
                column !== "timezones" &&
                column !== "latlng" &&
                column !== "currencies" &&
                column !== "languages"
              )
                return <th>{column}</th>;
            })}
          </tr>
          {countries.map((country: any, index) => {
            return (
              <tr>
                {columns.map((column: string, index: number) => {
                  if (
                    column !== "borders" &&
                    column !== "timezones" &&
                    column !== "latlng" &&
                    column !== "currencies" &&
                    column !== "languages"
                  )
                    return (
                      <td>
                        {column === "flag" ? (
                          <Link
                            to={{
                              pathname: "/users",
                              state: { item: country },
                            }}
                          >
                            <img
                              src={country.flag}
                              alt={country.name}
                              className="flag"
                            />
                          </Link>
                        ) : (
                          <p>{country[column]}</p>
                        )}
                      </td>
                    );
                })}
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};
