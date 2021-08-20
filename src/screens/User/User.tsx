import React, { Children, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FetchDataApi from "../../http/FetchDataApi";
import Tree from "react-d3-tree";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import "./User.css";
import { MyMapComponent } from "../../components/MapContainer";
import { useTimeHooks } from "../../Hooks/timeHooks";
import moment from "moment";

const mapData = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};

const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

interface HomeProps {
  text: string;
  lat: any;
  lng: any;
}

interface treeProps {
  name: string;
  children?: any[];
}

export const User = () => {
  const { state } = useLocation<any>();
  const [countryDetail, setTextValue] = useState(state.item);
  const timeZone = countryDetail.timezones[0];
  const treeObject: any = {
    name: countryDetail.name,
    children: countryDetail.borders.map((neighbor: any) => {
      return { name: neighbor };
    }),
  };
  const [treeData, setTreeData] = useState<treeProps>(treeObject);
  const [time] = useTimeHooks(timeZone);

  return (
    <div>
      <div className="album py-5 bg-light">
        <div className="container">
          <img
            src={countryDetail.flag}
            alt={countryDetail.name}
            height={"10%"}
            width={"30%"}
            className={"img-container"}
          />
          <h1>{time}</h1>
        </div>
      </div>
      {treeData ? (
        <div
          id="treeWrapper"
          className="container"
          style={{ width: "100em", height: "20em", }}
        >
          <Tree data={treeData} pathFunc={"straight"} orientation={"vertical"}/>
        </div>
      ) : null}
      <div className="row m-5">
        <div className="col-md-6">
          <text className="text">Name : {countryDetail.name}</text>
          <br />
          <text className="text">Population: {countryDetail.population}</text>
          <br />
          <text className="text">Native Name: {countryDetail.nativeName}</text>
          <br />
          <text className="text">Capital: {countryDetail.capital}</text>
        </div>
        <div className="col-md-6">
          <div className="row">
            <text className="text">Currencies :</text>
            <div className="row">
              {countryDetail.currencies &&
                countryDetail.currencies.length &&
                countryDetail.currencies.map((currency: any, index: number) => {
                  return (
                    <div className="currency-view">
                      <text className="sub-text">{currency.code}</text>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <text className="text">Languages :</text>
            <div className="row">
              {countryDetail.languages &&
                countryDetail.languages.length &&
                countryDetail.languages.map((language: any, index: number) => {
                  return (
                    <div className="col-sm">
                      <text className="sub-text">{language.nativeName}</text>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="mapContainer">
        <MyMapComponent
          lat={countryDetail.latlng[0]}
          lng={countryDetail.latlng[1]}
        />
      </div>
    </div>
  );
};
