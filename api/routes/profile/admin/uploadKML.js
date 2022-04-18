import { currentUser } from "../../../common/middlewares/current-user";
const express = require("express");
const router = express.Router();
var path = require("path");
import * as fs from "fs";
import { ObjectId } from "mongodb";
import { KmlDocument } from "kmljs";

// import { OpenStreetMapProvider } from "leaflet-geosearch";
// const provider = new OpenStreetMapProvider({
//   params: {
//     "accept-language": "pl",
//     countrycodes: "pl",
//     addressdetails: 1,
//     // extratags: 1,
//     limit: 1,
//   },
// });
import { convertKml } from "@gb-maps/parsers";
const Points = require("../../../../models/pointsSchema");
const formidable = require("formidable");
router.post("/profile/admin/upload/kml", currentUser, async (req, res) => {
  //   try {
  if (!req.currentUser) {
    res.json({ payload: "User not faund" });
    return;
  }
  const { email, id } = req.currentUser;
  const { pointID, filesIsNull } = req.query;

  const form = new formidable.IncomingForm();
  form.multiples = false;
  form.maxFileSize = 100 * 1024 * 1024;

  // res.json({ distance });
  const ovtet = form.parse(req, async (err, fields, files) => {
    return;
    const kml = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
      <Document>
        <name>Chata polska</name>
        <Style id="icon-1502-DB4436-normal">
          <IconStyle>
            <color>ff3644db</color>
            <scale>1</scale>
            <Icon>
              <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>
            </Icon>
          </IconStyle>
          <LabelStyle>
            <scale>0</scale>
          </LabelStyle>
        </Style>
        <Style id="icon-1502-DB4436-highlight">
          <IconStyle>
            <color>ff3644db</color>
            <scale>1</scale>
            <Icon>
              <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>
            </Icon>
          </IconStyle>
          <LabelStyle>
            <scale>1</scale>
          </LabelStyle>
        </Style>
        <StyleMap id="icon-1502-DB4436">
          <Pair>
            <key>normal</key>
            <styleUrl>#icon-1502-DB4436-normal</styleUrl>
          </Pair>
          <Pair>
            <key>highlight</key>
            <styleUrl>#icon-1502-DB4436-highlight</styleUrl>
          </Pair>
        </StyleMap>
        <Style id="icon-1899-0288D1-normal">
          <IconStyle>
            <color>ffd18802</color>
            <scale>1</scale>
            <Icon>
              <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>
            </Icon>
            <hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/>
          </IconStyle>
          <LabelStyle>
            <scale>0</scale>
          </LabelStyle>
        </Style>
        <Style id="icon-1899-0288D1-highlight">
          <IconStyle>
            <color>ffd18802</color>
            <scale>1</scale>
            <Icon>
              <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>
            </Icon>
            <hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/>
          </IconStyle>
          <LabelStyle>
            <scale>1</scale>
          </LabelStyle>
        </Style>
        <StyleMap id="icon-1899-0288D1">
          <Pair>
            <key>normal</key>
            <styleUrl>#icon-1899-0288D1-normal</styleUrl>
          </Pair>
          <Pair>
            <key>highlight</key>
            <styleUrl>#icon-1899-0288D1-highlight</styleUrl>
          </Pair>
        </StyleMap>
        <Style id="icon-1899-DB4436-normal">
          <IconStyle>
            <color>ff3644db</color>
            <scale>1</scale>
            <Icon>
              <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>
            </Icon>
            <hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/>
          </IconStyle>
          <LabelStyle>
            <scale>0</scale>
          </LabelStyle>
        </Style>
        <Style id="icon-1899-DB4436-highlight">
          <IconStyle>
            <color>ff3644db</color>
            <scale>1</scale>
            <Icon>
              <href>https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png</href>
            </Icon>
            <hotSpot x="32" xunits="pixels" y="64" yunits="insetPixels"/>
          </IconStyle>
          <LabelStyle>
            <scale>1</scale>
          </LabelStyle>
        </Style>
        <StyleMap id="icon-1899-DB4436">
          <Pair>
            <key>normal</key>
            <styleUrl>#icon-1899-DB4436-normal</styleUrl>
          </Pair>
          <Pair>
            <key>highlight</key>
            <styleUrl>#icon-1899-DB4436-highlight</styleUrl>
          </Pair>
        </StyleMap>
        <Placemark>
          <name>MARKET ABC BOŻENA PIEKARZ, WŁADYSŁAW PIEKARZ SPÓŁKA JAWNA</name>
          <address>59-300 LUBIN JASTRZĘBIA  6</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6920209894<br>Kod: 59-300<br>Miasto: LUBIN<br>Ulica: JASTRZĘBIA  6]]></description>
          <styleUrl>#icon-1899-DB4436</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.920209894E9</value>
            </Data>
            <Data name="Kod">
              <value>59-300</value>
            </Data>
            <Data name="Miasto">
              <value>LUBIN</value>
            </Data>
            <Data name="Ulica">
              <value>JASTRZĘBIA  6</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MARKET ABC BOŻENA PIEKARZ, WŁADYSŁAW PIEKARZSPÓŁKA JAWNA</name>
          <address>59-230 PROCHOWICE WROCŁAWSKA  18</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6920209894<br>Kod: 59-230<br>Miasto: PROCHOWICE<br>Ulica: WROCŁAWSKA  18]]></description>
          <styleUrl>#icon-1899-DB4436</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.920209894E9</value>
            </Data>
            <Data name="Kod">
              <value>59-230</value>
            </Data>
            <Data name="Miasto">
              <value>PROCHOWICE</value>
            </Data>
            <Data name="Ulica">
              <value>WROCŁAWSKA  18</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>AGA - SKLEP AGNIESZKA  KLAUZA</name>
          <address>55-200 OŁAWA 1 MAJA 20</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 9121132550<br>Kod: 55-200<br>Miasto: OŁAWA<br>Ulica: 1 MAJA 20]]></description>
          <styleUrl>#icon-1899-DB4436</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>9.12113255E9</value>
            </Data>
            <Data name="Kod">
              <value>55-200</value>
            </Data>
            <Data name="Miasto">
              <value>OŁAWA</value>
            </Data>
            <Data name="Ulica">
              <value>1 MAJA 20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY SPÓŁKA CYWILNA BOGDAN WODOK, MAREK PRASZKIEWICZ</name>
          <address>57-256 BARDO GŁÓWNA 25</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8870003653<br>Kod: 57-256<br>Miasto: BARDO<br>Ulica: GŁÓWNA 25]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.870003653E9</value>
            </Data>
            <Data name="Kod">
              <value>57-256</value>
            </Data>
            <Data name="Miasto">
              <value>BARDO</value>
            </Data>
            <Data name="Ulica">
              <value>GŁÓWNA 25</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO - PRZEMYSŁOWYEDYTA BECLA</name>
          <address>59-724 OSIECZNICA ŁAWSZOWA 70/10</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6121496871<br>Kod: 59-724<br>Miasto: OSIECZNICA<br>Ulica: ŁAWSZOWA 70/10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.121496871E9</value>
            </Data>
            <Data name="Kod">
              <value>59-724</value>
            </Data>
            <Data name="Miasto">
              <value>OSIECZNICA</value>
            </Data>
            <Data name="Ulica">
              <value>ŁAWSZOWA 70/10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWO-USŁUGOWE "BENO" RYSZARD BERNARDY]]></name>
          <address>57-213 STOSZOWICE STOSZOWICE 99</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8871355816<br>Kod: 57-213<br>Miasto: STOSZOWICE<br>Ulica: STOSZOWICE 99]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.871355816E9</value>
            </Data>
            <Data name="Kod">
              <value>57-213</value>
            </Data>
            <Data name="Miasto">
              <value>STOSZOWICE</value>
            </Data>
            <Data name="Ulica">
              <value>STOSZOWICE 99</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[B&CA CONSULTING MAGDALENA CHLEBDA]]></name>
          <address>59-241 LEGNICKIE  POLE MIKOŁAJOWICE 16</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8831664043<br>Kod: 59-241<br>Miasto: LEGNICKIE  POLE<br>Ulica: MIKOŁAJOWICE 16]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.831664043E9</value>
            </Data>
            <Data name="Kod">
              <value>59-241</value>
            </Data>
            <Data name="Miasto">
              <value>LEGNICKIE  POLE</value>
            </Data>
            <Data name="Ulica">
              <value>MIKOŁAJOWICE 16</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY DK  DARIUSZ KRAUZE</name>
          <address>55-020 ŻÓRAWINA AL. NIEPODLEGŁOSCI 8A</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 9141170246<br>Kod: 55-020<br>Miasto: ŻÓRAWINA<br>Ulica: AL. NIEPODLEGŁOSCI 8A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>9.141170246E9</value>
            </Data>
            <Data name="Kod">
              <value>55-020</value>
            </Data>
            <Data name="Miasto">
              <value>ŻÓRAWINA</value>
            </Data>
            <Data name="Ulica">
              <value>AL. NIEPODLEGŁOSCI 8A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["DELIKATESY D.W."  DOROTA ZAJĄC]]></name>
          <address>58-160 ŚWIEBODZICE RYNEK  2</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8841386723<br>Kod: 58-160<br>Miasto: ŚWIEBODZICE<br>Ulica: RYNEK  2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.841386723E9</value>
            </Data>
            <Data name="Kod">
              <value>58-160</value>
            </Data>
            <Data name="Miasto">
              <value>ŚWIEBODZICE</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK  2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DUKO SPÓŁKA  JAWNA  D.DRAPIEJ , A.DAWIEC</name>
          <address>58-500 JELENIA GÓRA SOLNA 2</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6110201369<br>Kod: 58-500<br>Miasto: JELENIA GÓRA<br>Ulica: SOLNA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.110201369E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>SOLNA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GMINNA SPÓŁDZIELNIA SAMOPOMOC CHŁOPSKA W JELENIOWIE</name>
          <address>57-343 JELENIÓW PLAC SPÓŁDZIELCZY 49</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8830002914<br>Kod: 57-343<br>Miasto: JELENIÓW<br>Ulica: PLAC SPÓŁDZIELCZY 49]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.830002914E9</value>
            </Data>
            <Data name="Kod">
              <value>57-343</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIÓW</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC SPÓŁDZIELCZY 49</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA"SKLEP NR 19]]></name>
          <address>55-040 BIELANY WROCŁAWSKIE WROCŁAWSKA 41B</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8960002640<br>Kod: 55-040<br>Miasto: BIELANY WROCŁAWSKIE<br>Ulica: WROCŁAWSKA 41B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.96000264E9</value>
            </Data>
            <Data name="Kod">
              <value>55-040</value>
            </Data>
            <Data name="Miasto">
              <value>BIELANY WROCŁAWSKIE</value>
            </Data>
            <Data name="Ulica">
              <value>WROCŁAWSKA 41B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA"]]></name>
          <address>55-040 TYNIEC NAD ŚLĘŻĄ SZKOLNA 21</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8960002640<br>Kod: 55-040<br>Miasto: TYNIEC NAD ŚLĘŻĄ<br>Ulica: SZKOLNA 21]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.96000264E9</value>
            </Data>
            <Data name="Kod">
              <value>55-040</value>
            </Data>
            <Data name="Miasto">
              <value>TYNIEC NAD ŚLĘŻĄ</value>
            </Data>
            <Data name="Ulica">
              <value>SZKOLNA 21</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA"MINI MARKET]]></name>
          <address>55-040 KOBIERZYCE WITOSA 22</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8960002640<br>Kod: 55-040<br>Miasto: KOBIERZYCE<br>Ulica: WITOSA 22]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.96000264E9</value>
            </Data>
            <Data name="Kod">
              <value>55-040</value>
            </Data>
            <Data name="Miasto">
              <value>KOBIERZYCE</value>
            </Data>
            <Data name="Ulica">
              <value>WITOSA 22</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO PRODUKCYJNO-HANDLOWE HE-MA HENRYKLORCZYK</name>
          <address>57-200 ZĄBKOWICE ŚLĄSKIE RYNEK 13</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8870000991<br>Kod: 57-200<br>Miasto: ZĄBKOWICE ŚLĄSKIE<br>Ulica: RYNEK 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.870000991E9</value>
            </Data>
            <Data name="Kod">
              <value>57-200</value>
            </Data>
            <Data name="Miasto">
              <value>ZĄBKOWICE ŚLĄSKIE</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPRZEDSIĘBIORSTWO HANDLOWE "HE-MA"SKELPSAMOOBSŁUGOWY MARKET" HENRYK  LORCZYK]]></name>
          <address>57-200 ZĄBKOWICE ŚLĄSKIE RYNEK 11</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8870000991<br>Kod: 57-200<br>Miasto: ZĄBKOWICE ŚLĄSKIE<br>Ulica: RYNEK 11]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.870000991E9</value>
            </Data>
            <Data name="Kod">
              <value>57-200</value>
            </Data>
            <Data name="Miasto">
              <value>ZĄBKOWICE ŚLĄSKIE</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 11</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPOŻYWCZO-PRZEMYSŁOWY "IRENA"-IRENA ŻYGADŁO]]></name>
          <address>55-065 JORDANÓW ŚLĄSKI WROCŁAWSKA  43</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 9141083139<br>Kod: 55-065<br>Miasto: JORDANÓW ŚLĄSKI<br>Ulica: WROCŁAWSKA  43]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>9.141083139E9</value>
            </Data>
            <Data name="Kod">
              <value>55-065</value>
            </Data>
            <Data name="Miasto">
              <value>JORDANÓW ŚLĄSKI</value>
            </Data>
            <Data name="Ulica">
              <value>WROCŁAWSKA  43</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-PRZEMYSŁOWY ANNA KOLAŃSKA</name>
          <address>55-003 CZERNICA UL. LEŚNA 1 CHRZĄSTAWA MAŁA</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 9121223531<br>Kod: 55-003<br>Miasto: CZERNICA<br>Ulica: UL. LEŚNA 1 CHRZĄSTAWA MAŁA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>9.121223531E9</value>
            </Data>
            <Data name="Kod">
              <value>55-003</value>
            </Data>
            <Data name="Miasto">
              <value>CZERNICA</value>
            </Data>
            <Data name="Ulica">
              <value>UL. LEŚNA 1 CHRZĄSTAWA MAŁA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWO PRODUKCYJNO USŁUGOWE MAGA ALICJA MAZUR</name>
          <address>58-506 JELENIA GÓRA KIEPURY  10-12</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6111046511<br>Kod: 58-506<br>Miasto: JELENIA GÓRA<br>Ulica: KIEPURY  10-12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.111046511E9</value>
            </Data>
            <Data name="Kod">
              <value>58-506</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>KIEPURY  10-12</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO PRODUKCYJNO HANDLOWO USŁUGOWE A.T.W. MARGASIŃSCY SPÓŁKA JAWNA</name>
          <address>57-220 ZIĘBICE RYNEK 19</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8871670831<br>Kod: 57-220<br>Miasto: ZIĘBICE<br>Ulica: RYNEK 19]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.871670831E9</value>
            </Data>
            <Data name="Kod">
              <value>57-220</value>
            </Data>
            <Data name="Miasto">
              <value>ZIĘBICE</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 19</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MARKET MAX ANITA  KURIATA BOREK STRZELIŃSKI</name>
          <address>57-160 BOREK STRZELIŃSKI OŁAWSKA  2</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8951455141<br>Kod: 57-160<br>Miasto: BOREK STRZELIŃSKI<br>Ulica: OŁAWSKA  2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.951455141E9</value>
            </Data>
            <Data name="Kod">
              <value>57-160</value>
            </Data>
            <Data name="Miasto">
              <value>BOREK STRZELIŃSKI</value>
            </Data>
            <Data name="Ulica">
              <value>OŁAWSKA  2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY MARTYNKA SPÓŁKA CYWILNAGABRIELA GAC, KRZYSZTOF GAC</name>
          <address>51-126 WROCŁAW H.M. KAMIEŃSKIEGO 207  U1</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8952034140<br>Kod: 51-126<br>Miasto: WROCŁAW<br>Ulica: H.M. KAMIEŃSKIEGO 207  U1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.95203414E9</value>
            </Data>
            <Data name="Kod">
              <value>51-126</value>
            </Data>
            <Data name="Miasto">
              <value>WROCŁAW</value>
            </Data>
            <Data name="Ulica">
              <value>H.M. KAMIEŃSKIEGO 207  U1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP "MAX" MISZTAL I ROGOZIŃSKA SPÓŁKA JAWNA]]></name>
          <address>55-002 KAMIENIEC WROCŁAWSKI WROCŁAWSKA 98</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 9121650121<br>Kod: 55-002<br>Miasto: KAMIENIEC WROCŁAWSKI<br>Ulica: WROCŁAWSKA 98]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>9.121650121E9</value>
            </Data>
            <Data name="Kod">
              <value>55-002</value>
            </Data>
            <Data name="Miasto">
              <value>KAMIENIEC WROCŁAWSKI</value>
            </Data>
            <Data name="Ulica">
              <value>WROCŁAWSKA 98</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[TADEUSZ MAZUR, ALICJA MAZUR FIRMA HANDLOWA"MAZURY" SPÓŁKA JAWNA]]></name>
          <address>58-500 JELENIA GÓRA KOMEDY TRZCIŃSKIEGO  12</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6111403649<br>Kod: 58-500<br>Miasto: JELENIA GÓRA<br>Ulica: KOMEDY TRZCIŃSKIEGO  12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.111403649E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>KOMEDY TRZCIŃSKIEGO  12</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU MARCIN MIARA</name>
          <address>54-111 WROCŁAW MRĄGOWSKA 78/101</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8981082029<br>Kod: 54-111<br>Miasto: WROCŁAW<br>Ulica: MRĄGOWSKA 78/101]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.981082029E9</value>
            </Data>
            <Data name="Kod">
              <value>54-111</value>
            </Data>
            <Data name="Miasto">
              <value>WROCŁAW</value>
            </Data>
            <Data name="Ulica">
              <value>MRĄGOWSKA 78/101</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MINI MARKET RAFAŁ CYBULSKI KAMIL CYBULSKI SPÓŁKA CYWILNA</name>
          <address>55-020 ŻÓRAWINA OŁAWSKA 13C, STARY ŚLESZÓW</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8961589825<br>Kod: 55-020<br>Miasto: ŻÓRAWINA<br>Ulica: OŁAWSKA 13C, STARY ŚLESZÓW]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.961589825E9</value>
            </Data>
            <Data name="Kod">
              <value>55-020</value>
            </Data>
            <Data name="Miasto">
              <value>ŻÓRAWINA</value>
            </Data>
            <Data name="Ulica">
              <value>OŁAWSKA 13C, STARY ŚLESZÓW</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MINI MARKET MAX  ZENON PISTOR</name>
          <address>57-160 BORÓW WROCŁAWSKA 8</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 9140004965<br>Kod: 57-160<br>Miasto: BORÓW<br>Ulica: WROCŁAWSKA 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>9.140004965E9</value>
            </Data>
            <Data name="Kod">
              <value>57-160</value>
            </Data>
            <Data name="Miasto">
              <value>BORÓW</value>
            </Data>
            <Data name="Ulica">
              <value>WROCŁAWSKA 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>WOJCIECH MISZTAL AUTO MYJNIA</name>
          <address>55-002 KAMIEŃ WROCŁAWSKI WROCŁAWSKA 96</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8961218230<br>Kod: 55-002<br>Miasto: KAMIEŃ WROCŁAWSKI<br>Ulica: WROCŁAWSKA 96]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.96121823E9</value>
            </Data>
            <Data name="Kod">
              <value>55-002</value>
            </Data>
            <Data name="Miasto">
              <value>KAMIEŃ WROCŁAWSKI</value>
            </Data>
            <Data name="Ulica">
              <value>WROCŁAWSKA 96</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MONO SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</name>
          <address>55-220 WYSOKA MALINOWA 10</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8961597463<br>Kod: 55-220<br>Miasto: WYSOKA<br>Ulica: MALINOWA 10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.961597463E9</value>
            </Data>
            <Data name="Kod">
              <value>55-220</value>
            </Data>
            <Data name="Miasto">
              <value>WYSOKA</value>
            </Data>
            <Data name="Ulica">
              <value>MALINOWA 10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>NIEZAPOMINAJKA DOMINIKA KOŚCIELNA</name>
          <address>55-040 DOMASŁAW WROCŁAWSKA  28B</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8941969217<br>Kod: 55-040<br>Miasto: DOMASŁAW<br>Ulica: WROCŁAWSKA  28B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.941969217E9</value>
            </Data>
            <Data name="Kod">
              <value>55-040</value>
            </Data>
            <Data name="Miasto">
              <value>DOMASŁAW</value>
            </Data>
            <Data name="Ulica">
              <value>WROCŁAWSKA  28B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>OLIMP SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</name>
          <address>53-139 WROCŁAW NOWOWIEJSKA 104A</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8992540843<br>Kod: 53-139<br>Miasto: WROCŁAW<br>Ulica: NOWOWIEJSKA 104A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.992540843E9</value>
            </Data>
            <Data name="Kod">
              <value>53-139</value>
            </Data>
            <Data name="Miasto">
              <value>WROCŁAW</value>
            </Data>
            <Data name="Ulica">
              <value>NOWOWIEJSKA 104A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL ARTYKUŁAMI OGÓLNO-SPOŻYWCZYMI MIĘSNO-WĘDLINIARSKIMI KRYSTYNA DĄBROWSKA</name>
          <address>57-360 OŁDRZYCHOWICE KŁODZKIE KŁODZKA 54C</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8831020512<br>Kod: 57-360<br>Miasto: OŁDRZYCHOWICE KŁODZKIE<br>Ulica: KŁODZKA 54C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.831020512E9</value>
            </Data>
            <Data name="Kod">
              <value>57-360</value>
            </Data>
            <Data name="Miasto">
              <value>OŁDRZYCHOWICE KŁODZKIE</value>
            </Data>
            <Data name="Ulica">
              <value>KŁODZKA 54C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO USŁUGOWA "ORION" STANISŁAW PAGÓRSKI]]></name>
          <address>59-220 LEGNICA ZŁOTORYJSKA 30</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6120006310<br>Kod: 59-220<br>Miasto: LEGNICA<br>Ulica: ZŁOTORYJSKA 30]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.12000631E9</value>
            </Data>
            <Data name="Kod">
              <value>59-220</value>
            </Data>
            <Data name="Miasto">
              <value>LEGNICA</value>
            </Data>
            <Data name="Ulica">
              <value>ZŁOTORYJSKA 30</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZY JULIA I RAFAŁ  OZGA SPÓŁKA CYWILNA</name>
          <address>55-095 MIRKÓW , DŁUGOŁĘKA BRONIEWSKIEGO 3</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8961336857<br>Kod: 55-095<br>Miasto: MIRKÓW , DŁUGOŁĘKA<br>Ulica: BRONIEWSKIEGO 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.961336857E9</value>
            </Data>
            <Data name="Kod">
              <value>55-095</value>
            </Data>
            <Data name="Miasto">
              <value>MIRKÓW , DŁUGOŁĘKA</value>
            </Data>
            <Data name="Ulica">
              <value>BRONIEWSKIEGO 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.U.H. ARTUR PAWLAK</name>
          <address>50-321 WROCŁAW STEFANA ŻEROMOSKIEGO 60/2</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8991820664<br>Kod: 50-321<br>Miasto: WROCŁAW<br>Ulica: STEFANA ŻEROMOSKIEGO 60/2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.991820664E9</value>
            </Data>
            <Data name="Kod">
              <value>50-321</value>
            </Data>
            <Data name="Miasto">
              <value>WROCŁAW</value>
            </Data>
            <Data name="Ulica">
              <value>STEFANA ŻEROMOSKIEGO 60/2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPOŁEM POWSZECHNA SPÓŁDZIELNIA SPOŻYWCÓW SKLEP NR 2</name>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6110203428<br>Kod: 58-506<br>Miasto: JELENIA GÓRA-CIEPLICE<br>Ulica: 20 LECIA 4 A]]></description>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-506</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA-CIEPLICE</value>
            </Data>
            <Data name="Ulica">
              <value>20 LECIA 4 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPOŁEM POWSZECHNA SPÓŁDZIELNIA SPOŻYWCÓW SKLEP NR 3</name>
          <address>58-506 JELENIA GÓRA JUSZCZAKA 28</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6110203428<br>Kod: 58-506<br>Miasto: JELENIA GÓRA<br>Ulica: JUSZCZAKA 28]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-506</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>JUSZCZAKA 28</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPOŁEM POWSZECHNA SPÓŁDZIELNIA SPOŻYWCÓWSKLEP JUBILAT</name>
          <address>58-500 JELENIA GÓRA OGIŃSKIEGO 13</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6110203428<br>Kod: 58-500<br>Miasto: JELENIA GÓRA<br>Ulica: OGIŃSKIEGO 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>OGIŃSKIEGO 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPOŁEM POWSZECHNA SPÓŁDZIELNIA SPOŻYWCÓWSKLEP NR 1</name>
          <address>58-500 JELENIA GÓRA PODGÓRNA 2</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6110203428<br>Kod: 58-500<br>Miasto: JELENIA GÓRA<br>Ulica: PODGÓRNA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>PODGÓRNA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPOŁEM POWSZECHNA SPÓŁDZIELNIA SPOŻYWCÓW SKLEP NR 5</name>
          <address>58-506 JELENIA GÓRA PL. RATUSZOWY 19</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6110203428<br>Kod: 58-506<br>Miasto: JELENIA GÓRA<br>Ulica: PL. RATUSZOWY 19]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-506</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>PL. RATUSZOWY 19</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPOŁEM POWSZECHNA SPÓŁDZIELNIA SPOŻYWCÓWSKLEP NR 6</name>
          <address>58-500 JELENIA GÓRA RÓŻYCKIEGO 4</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6110203428<br>Kod: 58-500<br>Miasto: JELENIA GÓRA<br>Ulica: RÓŻYCKIEGO 4]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>RÓŻYCKIEGO 4</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPOŁEM POWSZECHNA SPÓŁDZIELNIA SPOŻYWCÓWSKLEP RONDO</name>
          <address>58-500 JELENIA GÓRA RÓŻYCKIEGO 2A</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6110203428<br>Kod: 58-500<br>Miasto: JELENIA GÓRA<br>Ulica: RÓŻYCKIEGO 2A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>RÓŻYCKIEGO 2A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWE SAWCZAK SPÓŁKA JAWNA</name>
          <address>59-620 GRYFÓW ŚLĄSKI KOLEJOWA 20 A</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6161475071<br>Kod: 59-620<br>Miasto: GRYFÓW ŚLĄSKI<br>Ulica: KOLEJOWA 20 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.161475071E9</value>
            </Data>
            <Data name="Kod">
              <value>59-620</value>
            </Data>
            <Data name="Miasto">
              <value>GRYFÓW ŚLĄSKI</value>
            </Data>
            <Data name="Ulica">
              <value>KOLEJOWA 20 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWE SAWCZAK SPÓŁKA JAWNA</name>
          <address>59-620 LUBOMIERZ KOWALSKIEGO 9</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6161475071<br>Kod: 59-620<br>Miasto: LUBOMIERZ<br>Ulica: KOWALSKIEGO 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.161475071E9</value>
            </Data>
            <Data name="Kod">
              <value>59-620</value>
            </Data>
            <Data name="Miasto">
              <value>LUBOMIERZ</value>
            </Data>
            <Data name="Ulica">
              <value>KOWALSKIEGO 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWE SAWCZAK SPÓŁKA JAWNA</name>
          <address>59-620 GRYFÓW ŚLĄSKI RYNEK 37</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6161475071<br>Kod: 59-620<br>Miasto: GRYFÓW ŚLĄSKI<br>Ulica: RYNEK 37]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.161475071E9</value>
            </Data>
            <Data name="Kod">
              <value>59-620</value>
            </Data>
            <Data name="Miasto">
              <value>GRYFÓW ŚLĄSKI</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 37</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZY S.C. GENOWEFA SIKORA, JERZY SIKORA</name>
          <address>50-369 WROCŁAW MARII CURIE-SKŁODOWSKIEJ 49</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8980014681<br>Kod: 50-369<br>Miasto: WROCŁAW<br>Ulica: MARII CURIE-SKŁODOWSKIEJ 49]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.980014681E9</value>
            </Data>
            <Data name="Kod">
              <value>50-369</value>
            </Data>
            <Data name="Miasto">
              <value>WROCŁAW</value>
            </Data>
            <Data name="Ulica">
              <value>MARII CURIE-SKŁODOWSKIEJ 49</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GROSZ ROMAN  SKAŁECKI</name>
          <address>55-330 MROZÓW PIASTOWSKA 2A</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8951161741<br>Kod: 55-330<br>Miasto: MROZÓW<br>Ulica: PIASTOWSKA 2A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.951161741E9</value>
            </Data>
            <Data name="Kod">
              <value>55-330</value>
            </Data>
            <Data name="Miasto">
              <value>MROZÓW</value>
            </Data>
            <Data name="Ulica">
              <value>PIASTOWSKA 2A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SMAKOSZ II SPÓŁKA CYWILNA ALICJA MAZURTADEUSZ MAZUR  I PIOTR MAZUR</name>
          <address>58-500 JELENIA GÓRA PLAC PIASTOWSKI 34</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6112478508<br>Kod: 58-500<br>Miasto: JELENIA GÓRA<br>Ulica: PLAC PIASTOWSKI 34]]></description>
          <styleUrl>#icon-1502-DB4436</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.112478508E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC PIASTOWSKI 34</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>BEATA WAWRZYNIAK  SKLEP SPOŻYWCZO-PRZEMYSŁOWY</name>
          <address>59-724 OSIECZNICA LUBAŃSKA 45B</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 9241080117<br>Kod: 59-724<br>Miasto: OSIECZNICA<br>Ulica: LUBAŃSKA 45B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241080117E9</value>
            </Data>
            <Data name="Kod">
              <value>59-724</value>
            </Data>
            <Data name="Miasto">
              <value>OSIECZNICA</value>
            </Data>
            <Data name="Ulica">
              <value>LUBAŃSKA 45B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>WITAMINA  SP.J. TRZĘSOWSCY</name>
          <address>59-800 LUBAŃ BOLESŁAWA CHROBREGO 3</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6130002673<br>Kod: 59-800<br>Miasto: LUBAŃ<br>Ulica: BOLESŁAWA CHROBREGO 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.130002673E9</value>
            </Data>
            <Data name="Kod">
              <value>59-800</value>
            </Data>
            <Data name="Miasto">
              <value>LUBAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>BOLESŁAWA CHROBREGO 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>WITAMINA  SP.J. TRZĘSOWSCY</name>
          <address>59-800 LUBAŃ SPÓŁDZIELCZA 13</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 6130002673<br>Kod: 59-800<br>Miasto: LUBAŃ<br>Ulica: SPÓŁDZIELCZA 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>6.130002673E9</value>
            </Data>
            <Data name="Kod">
              <value>59-800</value>
            </Data>
            <Data name="Miasto">
              <value>LUBAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>SPÓŁDZIELCZA 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY D.W. DOROTA ZAJĄCDELIKATESY SUDECKIE</name>
          <address>58-160 ŚWIEBODZICE OS. SUDECKIE 10</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8841386723<br>Kod: 58-160<br>Miasto: ŚWIEBODZICE<br>Ulica: OS. SUDECKIE 10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.841386723E9</value>
            </Data>
            <Data name="Kod">
              <value>58-160</value>
            </Data>
            <Data name="Miasto">
              <value>ŚWIEBODZICE</value>
            </Data>
            <Data name="Ulica">
              <value>OS. SUDECKIE 10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FAMILY BIS SP. Z O.O.SPÓŁKA KOMANDYTOWA</name>
          <address>58-100 ŚWIDNICA KAROLA SZYMANOWSKIEGO  13</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8842788671<br>Kod: 58-100<br>Miasto: ŚWIDNICA<br>Ulica: KAROLA SZYMANOWSKIEGO  13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.842788671E9</value>
            </Data>
            <Data name="Kod">
              <value>58-100</value>
            </Data>
            <Data name="Miasto">
              <value>ŚWIDNICA</value>
            </Data>
            <Data name="Ulica">
              <value>KAROLA SZYMANOWSKIEGO  13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL DETALICZNY WITOLD ZAJĄC</name>
          <address>58-160 ŚWIEBODZICE BOLESŁAWA KRZYWOUSTEGO 44</address>
          <description><![CDATA[Województwo: dolnośląskie<br>NIP: 8841386700<br>Kod: 58-160<br>Miasto: ŚWIEBODZICE<br>Ulica: BOLESŁAWA KRZYWOUSTEGO 44]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>dolnośląskie</value>
            </Data>
            <Data name="NIP">
              <value>8.8413867E9</value>
            </Data>
            <Data name="Kod">
              <value>58-160</value>
            </Data>
            <Data name="Miasto">
              <value>ŚWIEBODZICE</value>
            </Data>
            <Data name="Ulica">
              <value>BOLESŁAWA KRZYWOUSTEGO 44</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP "ADRIAN" TOMASZ SARNIAK]]></name>
          <address>87-865 IZBICA KUJAWSKA PL. WOLNOŚCI  21</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 6661625740<br>Kod: 87-865<br>Miasto: IZBICA KUJAWSKA<br>Ulica: PL. WOLNOŚCI  21]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>6.66162574E9</value>
            </Data>
            <Data name="Kod">
              <value>87-865</value>
            </Data>
            <Data name="Miasto">
              <value>IZBICA KUJAWSKA</value>
            </Data>
            <Data name="Ulica">
              <value>PL. WOLNOŚCI  21</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>AGRO WINNERS SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</name>
          <address>86-131 JEŻEWO GŁÓWNA 20</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8762471110<br>Kod: 86-131<br>Miasto: JEŻEWO<br>Ulica: GŁÓWNA 20]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.76247111E9</value>
            </Data>
            <Data name="Kod">
              <value>86-131</value>
            </Data>
            <Data name="Miasto">
              <value>JEŻEWO</value>
            </Data>
            <Data name="Ulica">
              <value>GŁÓWNA 20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWO-USŁUGOWE BARTKOWSKA MAŁGORZATA SKLEP ABC</name>
          <address>85-171 BYDGOSZCZ 11 LISTOPADA 8</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 5541120706<br>Kod: 85-171<br>Miasto: BYDGOSZCZ<br>Ulica: 11 LISTOPADA 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.541120706E9</value>
            </Data>
            <Data name="Kod">
              <value>85-171</value>
            </Data>
            <Data name="Miasto">
              <value>BYDGOSZCZ</value>
            </Data>
            <Data name="Ulica">
              <value>11 LISTOPADA 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP WIELOBRANZOWY "DUKATO" ROBERT I DARIUSZ WASIELEWSKI]]></name>
          <address>85-132 BYDGOSZCZ UGORY  23</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 9531021057<br>Kod: 85-132<br>Miasto: BYDGOSZCZ<br>Ulica: UGORY  23]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>9.531021057E9</value>
            </Data>
            <Data name="Kod">
              <value>85-132</value>
            </Data>
            <Data name="Miasto">
              <value>BYDGOSZCZ</value>
            </Data>
            <Data name="Ulica">
              <value>UGORY  23</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GMINNA SPÓŁDZIELNIA SAMOPOMOC CHŁOPSKA</name>
          <address>87-620 KIKÓŁ PLAC KOŚCIUSZKI 9</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8930000180<br>Kod: 87-620<br>Miasto: KIKÓŁ<br>Ulica: PLAC KOŚCIUSZKI 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.93000018E9</value>
            </Data>
            <Data name="Kod">
              <value>87-620</value>
            </Data>
            <Data name="Miasto">
              <value>KIKÓŁ</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC KOŚCIUSZKI 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL HURTOWO-DETALICZNY E.CILIŃDŻH. HANYŻEWSKA</name>
          <address>86-061 BRZOZA PRZEMYSŁOWA 1 A</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 5542987620<br>Kod: 86-061<br>Miasto: BRZOZA<br>Ulica: PRZEMYSŁOWA 1 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.54298762E9</value>
            </Data>
            <Data name="Kod">
              <value>86-061</value>
            </Data>
            <Data name="Miasto">
              <value>BRZOZA</value>
            </Data>
            <Data name="Ulica">
              <value>PRZEMYSŁOWA 1 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ALFA - JAROSŁAW KOZIMIŃSKI</name>
          <address>87-800 WŁOCŁAWEK MONIUSZKI  1</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8881848868<br>Kod: 87-800<br>Miasto: WŁOCŁAWEK<br>Ulica: MONIUSZKI  1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.881848868E9</value>
            </Data>
            <Data name="Kod">
              <value>87-800</value>
            </Data>
            <Data name="Miasto">
              <value>WŁOCŁAWEK</value>
            </Data>
            <Data name="Ulica">
              <value>MONIUSZKI  1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[JAN KUBACKI P.P.H.U. "KUBA"]]></name>
          <address>88-230 PIOTRKÓW KUJAWSKI DWORCOWA 26</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8890002935<br>Kod: 88-230<br>Miasto: PIOTRKÓW KUJAWSKI<br>Ulica: DWORCOWA 26]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.890002935E9</value>
            </Data>
            <Data name="Kod">
              <value>88-230</value>
            </Data>
            <Data name="Miasto">
              <value>PIOTRKÓW KUJAWSKI</value>
            </Data>
            <Data name="Ulica">
              <value>DWORCOWA 26</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO USŁUGOWA "MARKO" MAREK ZALEWSKI]]></name>
          <address>88-160 JANIKOWO SZKOLNA  17 KOŁODZIEJOWO</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 5571408211<br>Kod: 88-160<br>Miasto: JANIKOWO<br>Ulica: SZKOLNA  17 KOŁODZIEJOWO]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.571408211E9</value>
            </Data>
            <Data name="Kod">
              <value>88-160</value>
            </Data>
            <Data name="Miasto">
              <value>JANIKOWO</value>
            </Data>
            <Data name="Ulica">
              <value>SZKOLNA  17 KOŁODZIEJOWO</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GALERIA PAŁUCKA</name>
          <address>88-400 ŻNIN GNIEŹNIEŃSKA  1 F</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 5620000623<br>Kod: 88-400<br>Miasto: ŻNIN<br>Ulica: GNIEŹNIEŃSKA  1 F]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.620000623E9</value>
            </Data>
            <Data name="Kod">
              <value>88-400</value>
            </Data>
            <Data name="Miasto">
              <value>ŻNIN</value>
            </Data>
            <Data name="Ulica">
              <value>GNIEŹNIEŃSKA  1 F</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWA PIOTR RYDZIK</name>
          <address>87-200 WĄBRZEŹNO 1-GO MAJA 43</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8780001544<br>Kod: 87-200<br>Miasto: WĄBRZEŹNO<br>Ulica: 1-GO MAJA 43]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.780001544E9</value>
            </Data>
            <Data name="Kod">
              <value>87-200</value>
            </Data>
            <Data name="Miasto">
              <value>WĄBRZEŹNO</value>
            </Data>
            <Data name="Ulica">
              <value>1-GO MAJA 43</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAWA SAWICKI I SPÓŁKA SP.J.</name>
          <address>86-134 DRAGACZ DOLNA GRUPA 23</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8762467404<br>Kod: 86-134<br>Miasto: DRAGACZ<br>Ulica: DOLNA GRUPA 23]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.762467404E9</value>
            </Data>
            <Data name="Kod">
              <value>86-134</value>
            </Data>
            <Data name="Miasto">
              <value>DRAGACZ</value>
            </Data>
            <Data name="Ulica">
              <value>DOLNA GRUPA 23</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAWA SAWICKI I SPÓŁKA SP.J.SKLEP RZĄDZIK 2</name>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8762467404<br>Kod: 86-300<br>Miasto: GRUDZIĄDZ<br>Ulica: SOBIESKIEGO 5]]></description>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.762467404E9</value>
            </Data>
            <Data name="Kod">
              <value>86-300</value>
            </Data>
            <Data name="Miasto">
              <value>GRUDZIĄDZ</value>
            </Data>
            <Data name="Ulica">
              <value>SOBIESKIEGO 5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWE  "JANSAW" SKLEPRZĄDZIK JANUSZ SAWICKI]]></name>
          <address>86-300 GRUDZIĄDZ ŁĘGI  9</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8760202794<br>Kod: 86-300<br>Miasto: GRUDZIĄDZ<br>Ulica: ŁĘGI  9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.760202794E9</value>
            </Data>
            <Data name="Kod">
              <value>86-300</value>
            </Data>
            <Data name="Miasto">
              <value>GRUDZIĄDZ</value>
            </Data>
            <Data name="Ulica">
              <value>ŁĘGI  9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPÓŁDZIELNIA HANDLOWO--ROLNICZAW CZERNIEWICACH   SKLEP NUMER 17 CHOCEŃ</name>
          <address>87-850 CHOCEŃ SIKORSKIEGO 15</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8880200384<br>Kod: 87-850<br>Miasto: CHOCEŃ<br>Ulica: SIKORSKIEGO 15]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.880200384E9</value>
            </Data>
            <Data name="Kod">
              <value>87-850</value>
            </Data>
            <Data name="Miasto">
              <value>CHOCEŃ</value>
            </Data>
            <Data name="Ulica">
              <value>SIKORSKIEGO 15</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPÓŁDZIELNIA HANDLOWO-ROLNICZAW CZERNIEWICACH SKLEP NUMER 1 ŚMIŁOWICE</name>
          <address>87-850 CHOCEŃ ŚMIŁOWICE 31</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8880200384<br>Kod: 87-850<br>Miasto: CHOCEŃ<br>Ulica: ŚMIŁOWICE 31]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.880200384E9</value>
            </Data>
            <Data name="Kod">
              <value>87-850</value>
            </Data>
            <Data name="Miasto">
              <value>CHOCEŃ</value>
            </Data>
            <Data name="Ulica">
              <value>ŚMIŁOWICE 31</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA TALS HURT-DETAL STEFAN JAWORSKI</name>
          <address>87-126 OBROWO SADOWA 2</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8790006299<br>Kod: 87-126<br>Miasto: OBROWO<br>Ulica: SADOWA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.790006299E9</value>
            </Data>
            <Data name="Kod">
              <value>87-126</value>
            </Data>
            <Data name="Miasto">
              <value>OBROWO</value>
            </Data>
            <Data name="Ulica">
              <value>SADOWA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA TALS HURT DETAL STEFAN  JAWORSKI</name>
          <address>87-408 CIECHOCIN CIECHOCIN 176</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8790006299<br>Kod: 87-408<br>Miasto: CIECHOCIN<br>Ulica: CIECHOCIN 176]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.790006299E9</value>
            </Data>
            <Data name="Kod">
              <value>87-408</value>
            </Data>
            <Data name="Miasto">
              <value>CIECHOCIN</value>
            </Data>
            <Data name="Ulica">
              <value>CIECHOCIN 176</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA TALS  HURT-DETAL STEFAN JAWORSKI</name>
          <address>87-123 DOBRZEJEWICE DOBRZEJEWICE 73</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8790006299<br>Kod: 87-123<br>Miasto: DOBRZEJEWICE<br>Ulica: DOBRZEJEWICE 73]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.790006299E9</value>
            </Data>
            <Data name="Kod">
              <value>87-123</value>
            </Data>
            <Data name="Miasto">
              <value>DOBRZEJEWICE</value>
            </Data>
            <Data name="Ulica">
              <value>DOBRZEJEWICE 73</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA TALS  HURT-DETAL STEFAN JAWORSKI</name>
          <address>87-123 DOBRZEJEWICE DOBRZEJEWICE 11 A</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8790006299<br>Kod: 87-123<br>Miasto: DOBRZEJEWICE<br>Ulica: DOBRZEJEWICE 11 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.790006299E9</value>
            </Data>
            <Data name="Kod">
              <value>87-123</value>
            </Data>
            <Data name="Miasto">
              <value>DOBRZEJEWICE</value>
            </Data>
            <Data name="Ulica">
              <value>DOBRZEJEWICE 11 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>TORA SPÓŁKA JAWNATOMASZ RAK  ROMAN  SOŁTAN</name>
          <address>85-684 Bydgoszcz SKROMNA 8</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 5542193363<br>Kod: 85-684<br>Miasto: Bydgoszcz<br>Ulica: SKROMNA 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.542193363E9</value>
            </Data>
            <Data name="Kod">
              <value>85-684</value>
            </Data>
            <Data name="Miasto">
              <value>Bydgoszcz</value>
            </Data>
            <Data name="Ulica">
              <value>SKROMNA 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY KRYSTYNA WOŹNIAK</name>
          <address>85-674 BYDGOSZCZ GDAŃSKA  146</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 9670749762<br>Kod: 85-674<br>Miasto: BYDGOSZCZ<br>Ulica: GDAŃSKA  146]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>9.670749762E9</value>
            </Data>
            <Data name="Kod">
              <value>85-674</value>
            </Data>
            <Data name="Miasto">
              <value>BYDGOSZCZ</value>
            </Data>
            <Data name="Ulica">
              <value>GDAŃSKA  146</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO USŁUGOWA PAWEŁ WSZELAKI</name>
          <address>87-602 CHROSTKOWO CHROSTKOWO  101</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 4660304257<br>Kod: 87-602<br>Miasto: CHROSTKOWO<br>Ulica: CHROSTKOWO  101]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>4.660304257E9</value>
            </Data>
            <Data name="Kod">
              <value>87-602</value>
            </Data>
            <Data name="Miasto">
              <value>CHROSTKOWO</value>
            </Data>
            <Data name="Ulica">
              <value>CHROSTKOWO  101</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY  POLO ANNA TESKA</name>
          <address>86-300 GRUDZIĄDZ LEGIONÓW 1A</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8761462020<br>Kod: 86-300<br>Miasto: GRUDZIĄDZ<br>Ulica: LEGIONÓW 1A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.76146202E9</value>
            </Data>
            <Data name="Kod">
              <value>86-300</value>
            </Data>
            <Data name="Miasto">
              <value>GRUDZIĄDZ</value>
            </Data>
            <Data name="Ulica">
              <value>LEGIONÓW 1A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ADI KING BARBARA OGÓRKIEWICZ</name>
          <address>68-210 NOWE CZAPLE KOPALNIANA 4</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9281695635<br>Kod: 68-210<br>Miasto: NOWE CZAPLE<br>Ulica: KOPALNIANA 4]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.281695635E9</value>
            </Data>
            <Data name="Kod">
              <value>68-210</value>
            </Data>
            <Data name="Miasto">
              <value>NOWE CZAPLE</value>
            </Data>
            <Data name="Ulica">
              <value>KOPALNIANA 4</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>BIAŁY DOMEK SKLEP SPOŻYWCZY NATALIA DOŁOWICZ</name>
          <address>66-300 MIĘDZYRZECZ KOPERNIKA 491</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 5961634292<br>Kod: 66-300<br>Miasto: MIĘDZYRZECZ<br>Ulica: KOPERNIKA 491]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.961634292E9</value>
            </Data>
            <Data name="Kod">
              <value>66-300</value>
            </Data>
            <Data name="Miasto">
              <value>MIĘDZYRZECZ</value>
            </Data>
            <Data name="Ulica">
              <value>KOPERNIKA 491</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO - USŁUGOWA "BM" SPÓŁKA CYWILNA BEATA ZARAZA, BOGUSŁAW ZARAZA]]></name>
          <address>66-615 DĄBIE ŁUŻYCKA  3 C</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9261565013<br>Kod: 66-615<br>Miasto: DĄBIE<br>Ulica: ŁUŻYCKA  3 C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.261565013E9</value>
            </Data>
            <Data name="Kod">
              <value>66-615</value>
            </Data>
            <Data name="Miasto">
              <value>DĄBIE</value>
            </Data>
            <Data name="Ulica">
              <value>ŁUŻYCKA  3 C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>JAROSŁAW CZERNICKI ZAKŁAD MASARNICZYCZERNICKI I SYN</name>
          <address>68-131 WYMIARKI KOŚCIUSZKI  25</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9241599109<br>Kod: 68-131<br>Miasto: WYMIARKI<br>Ulica: KOŚCIUSZKI  25]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241599109E9</value>
            </Data>
            <Data name="Kod">
              <value>68-131</value>
            </Data>
            <Data name="Miasto">
              <value>WYMIARKI</value>
            </Data>
            <Data name="Ulica">
              <value>KOŚCIUSZKI  25</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[MAREK PODKOŚCIELNY "DARMARTOM"]]></name>
          <address>68-100 ŻAGAŃ WESOŁA 42</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9241399132<br>Kod: 68-100<br>Miasto: ŻAGAŃ<br>Ulica: WESOŁA 42]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241399132E9</value>
            </Data>
            <Data name="Kod">
              <value>68-100</value>
            </Data>
            <Data name="Miasto">
              <value>ŻAGAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>WESOŁA 42</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY ROMAN DYTKO I BOGUSŁAW DYTKO SPÓŁKA JAWNA MARKET</name>
          <address>67-120 KOŻUCHÓW CHOPINA 2</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9250012374<br>Kod: 67-120<br>Miasto: KOŻUCHÓW<br>Ulica: CHOPINA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>67-120</value>
            </Data>
            <Data name="Miasto">
              <value>KOŻUCHÓW</value>
            </Data>
            <Data name="Ulica">
              <value>CHOPINA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY ROMAN DYTKO I BOGUSŁAW DYTKO SPÓŁKA JAWNA</name>
          <address>67-100 NOWA SÓL ALEKSANDRA FREDRY  8</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9250012374<br>Kod: 67-100<br>Miasto: NOWA SÓL<br>Ulica: ALEKSANDRA FREDRY  8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>67-100</value>
            </Data>
            <Data name="Miasto">
              <value>NOWA SÓL</value>
            </Data>
            <Data name="Ulica">
              <value>ALEKSANDRA FREDRY  8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY ROMAN DYTKO I BOGUSŁAW DYTKO SPÓŁKA JAWNA</name>
          <address>65-936 ZIELONA GÓRA ŻOŁNIERZY 2 ARMII 30-40</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9250012374<br>Kod: 65-936<br>Miasto: ZIELONA GÓRA<br>Ulica: ŻOŁNIERZY 2 ARMII 30-40]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>65-936</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>ŻOŁNIERZY 2 ARMII 30-40</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY ROMAN DYTKO I BOGUSŁAW DYTKO SPÓŁKA JAWNA MARKET</name>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9250012374<br>Kod: 67-120<br>Miasto: KOŻUCHÓW<br>Ulica: 22 -LIPCA 1807/1]]></description>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>67-120</value>
            </Data>
            <Data name="Miasto">
              <value>KOŻUCHÓW</value>
            </Data>
            <Data name="Ulica">
              <value>22 -LIPCA 1807/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY ROMAN DYTKO I BOGUSŁAW DYTKO SPÓŁKA JAWNA</name>
          <address>67-124 NOWE MIASTECZKO DŁUGA 4</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9250012374<br>Kod: 67-124<br>Miasto: NOWE MIASTECZKO<br>Ulica: DŁUGA 4]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>67-124</value>
            </Data>
            <Data name="Miasto">
              <value>NOWE MIASTECZKO</value>
            </Data>
            <Data name="Ulica">
              <value>DŁUGA 4</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWO - USŁUGOWE "EMILA" ROBERT MATUSZAK]]></name>
          <address>66-016 CZERWIEŃSK BOLESŁAWA CHROBREGO 1</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9291485141<br>Kod: 66-016<br>Miasto: CZERWIEŃSK<br>Ulica: BOLESŁAWA CHROBREGO 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.291485141E9</value>
            </Data>
            <Data name="Kod">
              <value>66-016</value>
            </Data>
            <Data name="Miasto">
              <value>CZERWIEŃSK</value>
            </Data>
            <Data name="Ulica">
              <value>BOLESŁAWA CHROBREGO 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWO USŁUGOWE "EMILA"ROBERT MATUSZAK]]></name>
          <address>65-001 ZIELONA GÓRA ZAWADA, UL.ZIELONOGÓRSKA 32</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9291485141<br>Kod: 65-001<br>Miasto: ZIELONA GÓRA<br>Ulica: ZAWADA, UL.ZIELONOGÓRSKA 32]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.291485141E9</value>
            </Data>
            <Data name="Kod">
              <value>65-001</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>ZAWADA, UL.ZIELONOGÓRSKA 32</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PAWILON HANDLOWY "EMILA" MATUSZAK IWONA]]></name>
          <address>65-001 ZIELONA GÓRA GRUNWALDZKA  43</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9730392543<br>Kod: 65-001<br>Miasto: ZIELONA GÓRA<br>Ulica: GRUNWALDZKA  43]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.730392543E9</value>
            </Data>
            <Data name="Kod">
              <value>65-001</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>GRUNWALDZKA  43</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PAWILON HANDLOWY "EMILA" MATUSZAK IWONA]]></name>
          <address>66-015 PRZYLEP PRZYLEP - SOLIDARNOŚCI 30 D</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9730392543<br>Kod: 66-015<br>Miasto: PRZYLEP<br>Ulica: PRZYLEP - SOLIDARNOŚCI 30 D]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.730392543E9</value>
            </Data>
            <Data name="Kod">
              <value>66-015</value>
            </Data>
            <Data name="Miasto">
              <value>PRZYLEP</value>
            </Data>
            <Data name="Ulica">
              <value>PRZYLEP - SOLIDARNOŚCI 30 D</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPHU "FENIKS"]]></name>
          <address>66-200 ŚWIEBODZIN POZNAŃSKA 29</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9271289193<br>Kod: 66-200<br>Miasto: ŚWIEBODZIN<br>Ulica: POZNAŃSKA 29]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271289193E9</value>
            </Data>
            <Data name="Kod">
              <value>66-200</value>
            </Data>
            <Data name="Miasto">
              <value>ŚWIEBODZIN</value>
            </Data>
            <Data name="Ulica">
              <value>POZNAŃSKA 29</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GROSIK SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ SKLEP GROSIK 2</name>
          <address>66-410 SKWIERZYNA JANA III SOBIESKIEGO 25</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9271929391<br>Kod: 66-410<br>Miasto: SKWIERZYNA<br>Ulica: JANA III SOBIESKIEGO 25]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271929391E9</value>
            </Data>
            <Data name="Kod">
              <value>66-410</value>
            </Data>
            <Data name="Miasto">
              <value>SKWIERZYNA</value>
            </Data>
            <Data name="Ulica">
              <value>JANA III SOBIESKIEGO 25</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GROSIK SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ SKLEP GROSIK 7</name>
          <address>66-200 ŚWIEBODZIN PIŁSUDSKIEGO  30</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9271929391<br>Kod: 66-200<br>Miasto: ŚWIEBODZIN<br>Ulica: PIŁSUDSKIEGO  30]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271929391E9</value>
            </Data>
            <Data name="Kod">
              <value>66-200</value>
            </Data>
            <Data name="Miasto">
              <value>ŚWIEBODZIN</value>
            </Data>
            <Data name="Ulica">
              <value>PIŁSUDSKIEGO  30</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>OSIEDLAK  ARTYKUŁY SPOŻYWCZE PRZEMYSŁAW GRUDA</name>
          <address>66-300 MIĘDZYRZECZ KOPERNIKA 491</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 5961358432<br>Kod: 66-300<br>Miasto: MIĘDZYRZECZ<br>Ulica: KOPERNIKA 491]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.961358432E9</value>
            </Data>
            <Data name="Kod">
              <value>66-300</value>
            </Data>
            <Data name="Miasto">
              <value>MIĘDZYRZECZ</value>
            </Data>
            <Data name="Ulica">
              <value>KOPERNIKA 491</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANTOM JACEK  MAJEWSKI</name>
          <address>66-200 ŚWIEBODZIN WOJSKA POLSKIEGO  10</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9271069540<br>Kod: 66-200<br>Miasto: ŚWIEBODZIN<br>Ulica: WOJSKA POLSKIEGO  10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.27106954E9</value>
            </Data>
            <Data name="Kod">
              <value>66-200</value>
            </Data>
            <Data name="Miasto">
              <value>ŚWIEBODZIN</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA POLSKIEGO  10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNO-SPOŻYWCZY JÓZEF HOŁÓWKO</name>
          <address>69-108 CYBINKA BIEGANÓW</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9260008629<br>Kod: 69-108<br>Miasto: CYBINKA<br>Ulica: BIEGANÓW]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.260008629E9</value>
            </Data>
            <Data name="Kod">
              <value>69-108</value>
            </Data>
            <Data name="Miasto">
              <value>CYBINKA</value>
            </Data>
            <Data name="Ulica">
              <value>BIEGANÓW</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWO USŁUGOWE "INEX" INGAKACZOR]]></name>
          <address>65-762 ZIELONA GÓRA WOJSKA POLSKIEGO 88C</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9730175314<br>Kod: 65-762<br>Miasto: ZIELONA GÓRA<br>Ulica: WOJSKA POLSKIEGO 88C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.730175314E9</value>
            </Data>
            <Data name="Kod">
              <value>65-762</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA POLSKIEGO 88C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWO USŁUGOWE "JOBEX" BOGUSŁAW GOJDKA]]></name>
          <address>66-300 MIĘDZYRZECZ WOJSKA POLSKEGO NR DZ 611/61</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 5961258794<br>Kod: 66-300<br>Miasto: MIĘDZYRZECZ<br>Ulica: WOJSKA POLSKEGO NR DZ 611/61]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.961258794E9</value>
            </Data>
            <Data name="Kod">
              <value>66-300</value>
            </Data>
            <Data name="Miasto">
              <value>MIĘDZYRZECZ</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA POLSKEGO NR DZ 611/61</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWO USŁUGOWE "KIER" SEBASTIAN KIERUL]]></name>
          <address>66-600 KROSNO ODRZAŃSKIE CZARNOWO 19</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9261467262<br>Kod: 66-600<br>Miasto: KROSNO ODRZAŃSKIE<br>Ulica: CZARNOWO 19]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.261467262E9</value>
            </Data>
            <Data name="Kod">
              <value>66-600</value>
            </Data>
            <Data name="Miasto">
              <value>KROSNO ODRZAŃSKIE</value>
            </Data>
            <Data name="Ulica">
              <value>CZARNOWO 19</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWO USŁUGOWE "MARCO" MAŁGORZATA CELIŃSKA]]></name>
          <address>65-960 ZIELONA GÓRA CYPRYSOWA 1</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9271008461<br>Kod: 65-960<br>Miasto: ZIELONA GÓRA<br>Ulica: CYPRYSOWA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271008461E9</value>
            </Data>
            <Data name="Kod">
              <value>65-960</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>CYPRYSOWA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWO-USŁUGOWE  "MARCO"MAŁGORZATA CELIŃSKA]]></name>
          <address>65-752 ZIELONA GÓRA OBJAZDOWA</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9271008461<br>Kod: 65-752<br>Miasto: ZIELONA GÓRA<br>Ulica: OBJAZDOWA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271008461E9</value>
            </Data>
            <Data name="Kod">
              <value>65-752</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>OBJAZDOWA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWO USŁUGOWE "MARCO" MAŁGORZATA CELIŃSKA]]></name>
          <address>65-001 ZIELONA GÓRA OKULICKIEGO 37</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9271008461<br>Kod: 65-001<br>Miasto: ZIELONA GÓRA<br>Ulica: OKULICKIEGO 37]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271008461E9</value>
            </Data>
            <Data name="Kod">
              <value>65-001</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA GÓRA</value>
            </Data>
            <Data name="Ulica">
              <value>OKULICKIEGO 37</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPOŻYWCZY "PLUS" JAROSŁAW PODYMA]]></name>
          <address>68-130 GOZDNICA KOŚCIELNA 14</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9241488019<br>Kod: 68-130<br>Miasto: GOZDNICA<br>Ulica: KOŚCIELNA 14]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241488019E9</value>
            </Data>
            <Data name="Kod">
              <value>68-130</value>
            </Data>
            <Data name="Miasto">
              <value>GOZDNICA</value>
            </Data>
            <Data name="Ulica">
              <value>KOŚCIELNA 14</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPOŻYWCZY "PLUS" JAROSŁAW PODYMA]]></name>
          <address>59-950 RUSZÓW II ARMII  WOJSKA POLSKIEGO 2</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9241488019<br>Kod: 59-950<br>Miasto: RUSZÓW<br>Ulica: II ARMII  WOJSKA POLSKIEGO 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241488019E9</value>
            </Data>
            <Data name="Kod">
              <value>59-950</value>
            </Data>
            <Data name="Miasto">
              <value>RUSZÓW</value>
            </Data>
            <Data name="Ulica">
              <value>II ARMII  WOJSKA POLSKIEGO 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPOZYWCZY "PLUS" JAROSŁAW PODYMA]]></name>
          <address>59-940 WĘGLINIEC SIKORSKIEGO  26</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9241488019<br>Kod: 59-940<br>Miasto: WĘGLINIEC<br>Ulica: SIKORSKIEGO  26]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241488019E9</value>
            </Data>
            <Data name="Kod">
              <value>59-940</value>
            </Data>
            <Data name="Miasto">
              <value>WĘGLINIEC</value>
            </Data>
            <Data name="Ulica">
              <value>SIKORSKIEGO  26</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ORION S.C.S.PAGÓRSKI, J. SZELEJEWSKI .</name>
          <address>59-726 ŚWIĘTOSZÓW BRZOZOWA 14</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 6121861537<br>Kod: 59-726<br>Miasto: ŚWIĘTOSZÓW<br>Ulica: BRZOZOWA 14]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>6.121861537E9</value>
            </Data>
            <Data name="Kod">
              <value>59-726</value>
            </Data>
            <Data name="Miasto">
              <value>ŚWIĘTOSZÓW</value>
            </Data>
            <Data name="Ulica">
              <value>BRZOZOWA 14</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO USŁUGOWA "ORION" STANISŁAW PAGÓRSKI]]></name>
          <address>59-724 OSIECZNICA PAROWA  40</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 6120006310<br>Kod: 59-724<br>Miasto: OSIECZNICA<br>Ulica: PAROWA  40]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>6.12000631E9</value>
            </Data>
            <Data name="Kod">
              <value>59-724</value>
            </Data>
            <Data name="Miasto">
              <value>OSIECZNICA</value>
            </Data>
            <Data name="Ulica">
              <value>PAROWA  40</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PARKING S.C.</name>
          <address>59-700 BOLESŁAWIEC BRZEŹNIK 37 A</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 6121468544<br>Kod: 59-700<br>Miasto: BOLESŁAWIEC<br>Ulica: BRZEŹNIK 37 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>6.121468544E9</value>
            </Data>
            <Data name="Kod">
              <value>59-700</value>
            </Data>
            <Data name="Miasto">
              <value>BOLESŁAWIEC</value>
            </Data>
            <Data name="Ulica">
              <value>BRZEŹNIK 37 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWO-USŁUGOWE  JÓZEFA OSSOLIŃSKA-PASIEKA</name>
          <address>66-460 WITNICA OGRODOWA  11D</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 5991755540<br>Kod: 66-460<br>Miasto: WITNICA<br>Ulica: OGRODOWA  11D]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.99175554E9</value>
            </Data>
            <Data name="Kod">
              <value>66-460</value>
            </Data>
            <Data name="Miasto">
              <value>WITNICA</value>
            </Data>
            <Data name="Ulica">
              <value>OGRODOWA  11D</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-PRZEMYSŁOWY JANUSZ PATYK</name>
          <address>67-200 GŁOGÓW RUDNOWSKA  85</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 6930002321<br>Kod: 67-200<br>Miasto: GŁOGÓW<br>Ulica: RUDNOWSKA  85]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>6.930002321E9</value>
            </Data>
            <Data name="Kod">
              <value>67-200</value>
            </Data>
            <Data name="Miasto">
              <value>GŁOGÓW</value>
            </Data>
            <Data name="Ulica">
              <value>RUDNOWSKA  85</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-PRZEMYSŁOWY MAŁA GASTRONOMIAANNA RYMARZ</name>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9241493003<br>Kod: 67-320<br>Miasto: MAŁOMICE<br>Ulica: LUBIECHÓW 93/1]]></description>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241493003E9</value>
            </Data>
            <Data name="Kod">
              <value>67-320</value>
            </Data>
            <Data name="Miasto">
              <value>MAŁOMICE</value>
            </Data>
            <Data name="Ulica">
              <value>LUBIECHÓW 93/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PAWILON HANDLOWY MAGDALENA STEFAN</name>
          <address>67-200 GŁOGÓW SATURNA 14</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 6932029666<br>Kod: 67-200<br>Miasto: GŁOGÓW<br>Ulica: SATURNA 14]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>6.932029666E9</value>
            </Data>
            <Data name="Kod">
              <value>67-200</value>
            </Data>
            <Data name="Miasto">
              <value>GŁOGÓW</value>
            </Data>
            <Data name="Ulica">
              <value>SATURNA 14</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-PRZEMYSŁOWY STANISŁAW SZYMAŃSKI</name>
          <address>67-415 KOLSKO PIASTOWSKA 40</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9230023535<br>Kod: 67-415<br>Miasto: KOLSKO<br>Ulica: PIASTOWSKA 40]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.230023535E9</value>
            </Data>
            <Data name="Kod">
              <value>67-415</value>
            </Data>
            <Data name="Miasto">
              <value>KOLSKO</value>
            </Data>
            <Data name="Ulica">
              <value>PIASTOWSKA 40</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWO-USŁUGOWE TOM-KRYS TOMASZ I STEFANIA PŁOCINIAK SPÓŁKA CYWILNA</name>
          <address>56-215 NIECHLÓW GŁOGOWSKA 13</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 4970091241<br>Kod: 56-215<br>Miasto: NIECHLÓW<br>Ulica: GŁOGOWSKA 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>4.970091241E9</value>
            </Data>
            <Data name="Kod">
              <value>56-215</value>
            </Data>
            <Data name="Miasto">
              <value>NIECHLÓW</value>
            </Data>
            <Data name="Ulica">
              <value>GŁOGOWSKA 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWO-USŁUGOWE TOM-KRYS TOMASZ I STEFANIA PŁOCINIAK SPÓŁKA CYWILNA</name>
          <address>67-200 GŁOGÓW RYCERSKA 25-27</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 4970091241<br>Kod: 67-200<br>Miasto: GŁOGÓW<br>Ulica: RYCERSKA 25-27]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>4.970091241E9</value>
            </Data>
            <Data name="Kod">
              <value>67-200</value>
            </Data>
            <Data name="Miasto">
              <value>GŁOGÓW</value>
            </Data>
            <Data name="Ulica">
              <value>RYCERSKA 25-27</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPHU " MIKA "  ANDRZEJ UDZIELASKLEP FIRMOWY]]></name>
          <address>69-110 RZEPIN DWORCOWA 48</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 5980002096<br>Kod: 69-110<br>Miasto: RZEPIN<br>Ulica: DWORCOWA 48]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.980002096E9</value>
            </Data>
            <Data name="Kod">
              <value>69-110</value>
            </Data>
            <Data name="Miasto">
              <value>RZEPIN</value>
            </Data>
            <Data name="Ulica">
              <value>DWORCOWA 48</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPHU " MIKA "  ANDRZEJ UDZIELASKLEP FIRMOWY]]></name>
          <address>69-110 RZEPIN ALEJA WOLNOŚCI 3</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 5980002096<br>Kod: 69-110<br>Miasto: RZEPIN<br>Ulica: ALEJA WOLNOŚCI 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.980002096E9</value>
            </Data>
            <Data name="Kod">
              <value>69-110</value>
            </Data>
            <Data name="Miasto">
              <value>RZEPIN</value>
            </Data>
            <Data name="Ulica">
              <value>ALEJA WOLNOŚCI 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KAMILA WŁODARCZAK  SKLEP SPOŻYWCZY</name>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9251965685<br>Kod: 67-312<br>Miasto: NIEGOSŁAWICE<br>Ulica: PRZECŁAW 302/3]]></description>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.251965685E9</value>
            </Data>
            <Data name="Kod">
              <value>67-312</value>
            </Data>
            <Data name="Miasto">
              <value>NIEGOSŁAWICE</value>
            </Data>
            <Data name="Ulica">
              <value>PRZECŁAW 302/3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY KRYSTYNA ZGANIACZ</name>
          <address>68-300 LUBSKO WROCŁAWSKA 57</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9280009454<br>Kod: 68-300<br>Miasto: LUBSKO<br>Ulica: WROCŁAWSKA 57]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.280009454E9</value>
            </Data>
            <Data name="Kod">
              <value>68-300</value>
            </Data>
            <Data name="Miasto">
              <value>LUBSKO</value>
            </Data>
            <Data name="Ulica">
              <value>WROCŁAWSKA 57</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL ART. SPOŻYWCZYMI  I TYTONIOWYMISŁAWOMIR ZWOLAK</name>
          <address>69-100 SŁUBICE OS. WIMAR 19</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 5981037760<br>Kod: 69-100<br>Miasto: SŁUBICE<br>Ulica: OS. WIMAR 19]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.98103776E9</value>
            </Data>
            <Data name="Kod">
              <value>69-100</value>
            </Data>
            <Data name="Miasto">
              <value>SŁUBICE</value>
            </Data>
            <Data name="Ulica">
              <value>OS. WIMAR 19</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-PRZEMYSŁOWYWOJCIECH ŻELAZEK</name>
          <address>68-210 NOWE CZAPLE NIWICA 32</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9282077253<br>Kod: 68-210<br>Miasto: NOWE CZAPLE<br>Ulica: NIWICA 32]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.282077253E9</value>
            </Data>
            <Data name="Kod">
              <value>68-210</value>
            </Data>
            <Data name="Miasto">
              <value>NOWE CZAPLE</value>
            </Data>
            <Data name="Ulica">
              <value>NIWICA 32</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.P.H. PEKROL ARKADIUSZ PEEK</name>
          <address>83-422 NOWY BARKOCZYN JANA PAWŁA II 9</address>
          <description><![CDATA[Województwo: pomorskie<br>NIP: 5910008171<br>Kod: 83-422<br>Miasto: NOWY BARKOCZYN<br>Ulica: JANA PAWŁA II 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.910008171E9</value>
            </Data>
            <Data name="Kod">
              <value>83-422</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY BARKOCZYN</value>
            </Data>
            <Data name="Ulica">
              <value>JANA PAWŁA II 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.P.H. PEKROL ARKADIUSZ PEEK</name>
          <address>83-420 LINIEWO GŁODOWO 54/1</address>
          <description><![CDATA[Województwo: pomorskie<br>NIP: 5910008171<br>Kod: 83-420<br>Miasto: LINIEWO<br>Ulica: GŁODOWO 54/1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.910008171E9</value>
            </Data>
            <Data name="Kod">
              <value>83-420</value>
            </Data>
            <Data name="Miasto">
              <value>LINIEWO</value>
            </Data>
            <Data name="Ulica">
              <value>GŁODOWO 54/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.P.H. PEKROL ARKADIUSZ PEEK</name>
          <address>83-420 LINIEWO WYZWOLENIA 9</address>
          <description><![CDATA[Województwo: pomorskie<br>NIP: 5910008171<br>Kod: 83-420<br>Miasto: LINIEWO<br>Ulica: WYZWOLENIA 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.910008171E9</value>
            </Data>
            <Data name="Kod">
              <value>83-420</value>
            </Data>
            <Data name="Miasto">
              <value>LINIEWO</value>
            </Data>
            <Data name="Ulica">
              <value>WYZWOLENIA 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.P.H. PEKROL ARKADIUSZ PEEK</name>
          <address>83-404 NOWA KARCZMA STAROGARDZKA 1</address>
          <description><![CDATA[Województwo: pomorskie<br>NIP: 5910008171<br>Kod: 83-404<br>Miasto: NOWA KARCZMA<br>Ulica: STAROGARDZKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.910008171E9</value>
            </Data>
            <Data name="Kod">
              <value>83-404</value>
            </Data>
            <Data name="Miasto">
              <value>NOWA KARCZMA</value>
            </Data>
            <Data name="Ulica">
              <value>STAROGARDZKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU MARIUSZ ROGAWSKI</name>
          <address>76-150 DARŁOWO MORSKA 19 WICIE</address>
          <description><![CDATA[Województwo: pomorskie<br>NIP: 9531518651<br>Kod: 76-150<br>Miasto: DARŁOWO<br>Ulica: MORSKA 19 WICIE]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>9.531518651E9</value>
            </Data>
            <Data name="Kod">
              <value>76-150</value>
            </Data>
            <Data name="Miasto">
              <value>DARŁOWO</value>
            </Data>
            <Data name="Ulica">
              <value>MORSKA 19 WICIE</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ABAMIX  SP.J.  ADAM SZYDLEWSKI, MICHAŁ SZYDLEWSKI</name>
          <address>64-115 WILKOWICE ŚWIĘCIECHOWSKA 2</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6971897941<br>Kod: 64-115<br>Miasto: WILKOWICE<br>Ulica: ŚWIĘCIECHOWSKA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.971897941E9</value>
            </Data>
            <Data name="Kod">
              <value>64-115</value>
            </Data>
            <Data name="Miasto">
              <value>WILKOWICE</value>
            </Data>
            <Data name="Ulica">
              <value>ŚWIĘCIECHOWSKA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPOŻYWCZO-PRZEMYSŁOWY "ABC" DANUTA SMOLIŃSKA]]></name>
          <address>62-330 NEKLA DWORCOWA 1 A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7891105298<br>Kod: 62-330<br>Miasto: NEKLA<br>Ulica: DWORCOWA 1 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.891105298E9</value>
            </Data>
            <Data name="Kod">
              <value>62-330</value>
            </Data>
            <Data name="Miasto">
              <value>NEKLA</value>
            </Data>
            <Data name="Ulica">
              <value>DWORCOWA 1 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.P.H.U.  ABC-DSŁAWOMIR  WOJDANOWICZ</name>
          <address>64-710 POŁAJEWO LUDOMY 71</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7661239167<br>Kod: 64-710<br>Miasto: POŁAJEWO<br>Ulica: LUDOMY 71]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661239167E9</value>
            </Data>
            <Data name="Kod">
              <value>64-710</value>
            </Data>
            <Data name="Miasto">
              <value>POŁAJEWO</value>
            </Data>
            <Data name="Ulica">
              <value>LUDOMY 71</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ADI FIRMA USŁUGOWO HANDLOWA ADAM BIESIADA</name>
          <address>62-020 SWARZĘDZ PLAC HANDLOWY 1 DOSTAWA DO 8</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7781065132<br>Kod: 62-020<br>Miasto: SWARZĘDZ<br>Ulica: PLAC HANDLOWY 1 DOSTAWA DO 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.781065132E9</value>
            </Data>
            <Data name="Kod">
              <value>62-020</value>
            </Data>
            <Data name="Miasto">
              <value>SWARZĘDZ</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC HANDLOWY 1 DOSTAWA DO 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[TRANSPORT - HANDEL "AGRO-JAR" JOANNA DROŻDŻYŃSKA]]></name>
          <address>64-400 MIĘDZYCHÓD MNICHY 12</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 5951331667<br>Kod: 64-400<br>Miasto: MIĘDZYCHÓD<br>Ulica: MNICHY 12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.951331667E9</value>
            </Data>
            <Data name="Kod">
              <value>64-400</value>
            </Data>
            <Data name="Miasto">
              <value>MIĘDZYCHÓD</value>
            </Data>
            <Data name="Ulica">
              <value>MNICHY 12</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[DELIKATESY "AVENA PLUS" GRAŻYNA ŚWIĄTEK]]></name>
          <address>64-100 LESZNO SŁOWIAŃSKA 20</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7820009713<br>Kod: 64-100<br>Miasto: LESZNO<br>Ulica: SŁOWIAŃSKA 20]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.820009713E9</value>
            </Data>
            <Data name="Kod">
              <value>64-100</value>
            </Data>
            <Data name="Miasto">
              <value>LESZNO</value>
            </Data>
            <Data name="Ulica">
              <value>SŁOWIAŃSKA 20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>B I A  BANASIAK SPÓŁKA CYWILNASTOKROTKA SKLEP SPOŻYWCZO PRZEMYSŁOWY</name>
          <address>62-610 SOMPOLNO LUBSTÓWEK  47</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6652989997<br>Kod: 62-610<br>Miasto: SOMPOLNO<br>Ulica: LUBSTÓWEK  47]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.652989997E9</value>
            </Data>
            <Data name="Kod">
              <value>62-610</value>
            </Data>
            <Data name="Miasto">
              <value>SOMPOLNO</value>
            </Data>
            <Data name="Ulica">
              <value>LUBSTÓWEK  47</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU  BEATA BORSKA</name>
          <address>62-003 BIEDRUSKO ZJEDNOCZENIA 12</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7791031229<br>Kod: 62-003<br>Miasto: BIEDRUSKO<br>Ulica: ZJEDNOCZENIA 12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.791031229E9</value>
            </Data>
            <Data name="Kod">
              <value>62-003</value>
            </Data>
            <Data name="Miasto">
              <value>BIEDRUSKO</value>
            </Data>
            <Data name="Ulica">
              <value>ZJEDNOCZENIA 12</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-PRZEMYSŁOWY BINGO RENATA BLOCH</name>
          <address>64-140 BOSZKOWO DOMINICKA 40A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6981353987<br>Kod: 64-140<br>Miasto: BOSZKOWO<br>Ulica: DOMINICKA 40A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.981353987E9</value>
            </Data>
            <Data name="Kod">
              <value>64-140</value>
            </Data>
            <Data name="Miasto">
              <value>BOSZKOWO</value>
            </Data>
            <Data name="Ulica">
              <value>DOMINICKA 40A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-PRZEMYSŁOWY BINGO RENATA BLOCH</name>
          <address>64-234 PRZEMĘT JAGIELLOŃSKA  13</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6981353987<br>Kod: 64-234<br>Miasto: PRZEMĘT<br>Ulica: JAGIELLOŃSKA  13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.981353987E9</value>
            </Data>
            <Data name="Kod">
              <value>64-234</value>
            </Data>
            <Data name="Miasto">
              <value>PRZEMĘT</value>
            </Data>
            <Data name="Ulica">
              <value>JAGIELLOŃSKA  13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPOŻYWCZO-PRZEMYSŁOWY "BINGO"  S.C. RENATA,CEZARY  BLOCH]]></name>
          <address>64-140 WŁOSZAKOWICE LEŚNA 1K</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6972310234<br>Kod: 64-140<br>Miasto: WŁOSZAKOWICE<br>Ulica: LEŚNA 1K]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.972310234E9</value>
            </Data>
            <Data name="Kod">
              <value>64-140</value>
            </Data>
            <Data name="Miasto">
              <value>WŁOSZAKOWICE</value>
            </Data>
            <Data name="Ulica">
              <value>LEŚNA 1K</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZY BOŻENA BORZYCH</name>
          <address>64-514 PRZECŁAW DŁUGA 28</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7822207015<br>Kod: 64-514<br>Miasto: PRZECŁAW<br>Ulica: DŁUGA 28]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822207015E9</value>
            </Data>
            <Data name="Kod">
              <value>64-514</value>
            </Data>
            <Data name="Miasto">
              <value>PRZECŁAW</value>
            </Data>
            <Data name="Ulica">
              <value>DŁUGA 28</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZY BOŻENA BORZYCH</name>
          <address>64-514 PAMIĄTKOWO SZKOLNA 15</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7822207015<br>Kod: 64-514<br>Miasto: PAMIĄTKOWO<br>Ulica: SZKOLNA 15]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822207015E9</value>
            </Data>
            <Data name="Kod">
              <value>64-514</value>
            </Data>
            <Data name="Miasto">
              <value>PAMIĄTKOWO</value>
            </Data>
            <Data name="Ulica">
              <value>SZKOLNA 15</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZY BOŻENA BORZYCH</name>
          <address>64-500 ŚMIŁOWO SPACEROWA 71 B</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7822207015<br>Kod: 64-500<br>Miasto: ŚMIŁOWO<br>Ulica: SPACEROWA 71 B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822207015E9</value>
            </Data>
            <Data name="Kod">
              <value>64-500</value>
            </Data>
            <Data name="Miasto">
              <value>ŚMIŁOWO</value>
            </Data>
            <Data name="Ulica">
              <value>SPACEROWA 71 B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H.U. CARMEN ŁUKASZ KUBIAK</name>
          <address>62-700 TUREK KALISKA 28</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6681729419<br>Kod: 62-700<br>Miasto: TUREK<br>Ulica: KALISKA 28]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.681729419E9</value>
            </Data>
            <Data name="Kod">
              <value>62-700</value>
            </Data>
            <Data name="Miasto">
              <value>TUREK</value>
            </Data>
            <Data name="Ulica">
              <value>KALISKA 28</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H.U. CARMEN ŁUKASZ KUBIAK</name>
          <address>99-210 UNIEJÓW KOŚCIELNICKA 140</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6681729419<br>Kod: 99-210<br>Miasto: UNIEJÓW<br>Ulica: KOŚCIELNICKA 140]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.681729419E9</value>
            </Data>
            <Data name="Kod">
              <value>99-210</value>
            </Data>
            <Data name="Miasto">
              <value>UNIEJÓW</value>
            </Data>
            <Data name="Ulica">
              <value>KOŚCIELNICKA 140</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H.U. CARMEN ŁUKASZ KUBIAK</name>
          <address>62-700 TUREK OSIEDLE WYZWOLENIA 11 A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6681729419<br>Kod: 62-700<br>Miasto: TUREK<br>Ulica: OSIEDLE WYZWOLENIA 11 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.681729419E9</value>
            </Data>
            <Data name="Kod">
              <value>62-700</value>
            </Data>
            <Data name="Miasto">
              <value>TUREK</value>
            </Data>
            <Data name="Ulica">
              <value>OSIEDLE WYZWOLENIA 11 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO-USŁUGOWAHURT-DETAL-GASTRONOMIA-USŁUGI TURYSTYCZNE WITOLD CEGLAREK</name>
          <address>64-410 SIERAKÓW ORLA  4</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7870004497<br>Kod: 64-410<br>Miasto: SIERAKÓW<br>Ulica: ORLA  4]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870004497E9</value>
            </Data>
            <Data name="Kod">
              <value>64-410</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAKÓW</value>
            </Data>
            <Data name="Ulica">
              <value>ORLA  4</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO-USŁUGOWAHURT-DETAL-GASTRONOMIA-USŁUGI TURYSTYCZNE WITOLD CEGLAREK</name>
          <address>64-410 SIERAKÓW SŁONECZNA 9</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7870004497<br>Kod: 64-410<br>Miasto: SIERAKÓW<br>Ulica: SŁONECZNA 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870004497E9</value>
            </Data>
            <Data name="Kod">
              <value>64-410</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAKÓW</value>
            </Data>
            <Data name="Ulica">
              <value>SŁONECZNA 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>CENTRUM HANDLOWE BARBARA ORZEŁ</name>
          <address>64-610 ROGOŹNO POLNA 18</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7660013320<br>Kod: 64-610<br>Miasto: ROGOŹNO<br>Ulica: POLNA 18]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.66001332E9</value>
            </Data>
            <Data name="Kod">
              <value>64-610</value>
            </Data>
            <Data name="Miasto">
              <value>ROGOŹNO</value>
            </Data>
            <Data name="Ulica">
              <value>POLNA 18</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ŁUKASZ STARCZAK  CHATA SWOJSKA</name>
          <address>64-610 ROGOŹNO WIELKA POZNAŃSKA  38</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7661710512<br>Kod: 64-610<br>Miasto: ROGOŹNO<br>Ulica: WIELKA POZNAŃSKA  38]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661710512E9</value>
            </Data>
            <Data name="Kod">
              <value>64-610</value>
            </Data>
            <Data name="Miasto">
              <value>ROGOŹNO</value>
            </Data>
            <Data name="Ulica">
              <value>WIELKA POZNAŃSKA  38</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELMAS MIŁOSZ ZACHARYASZ  SP.K.</name>
          <address>60-501 POZNAŃ J. KRASZEWSKIEGO  5</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7811973243<br>Kod: 60-501<br>Miasto: POZNAŃ<br>Ulica: J. KRASZEWSKIEGO  5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.811973243E9</value>
            </Data>
            <Data name="Kod">
              <value>60-501</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>J. KRASZEWSKIEGO  5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELMAS MIŁOSZ ZACHARYASZ  SP.K.</name>
          <address>60-501 POZNAŃ LITERACKA 34</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7811973243<br>Kod: 60-501<br>Miasto: POZNAŃ<br>Ulica: LITERACKA 34]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.811973243E9</value>
            </Data>
            <Data name="Kod">
              <value>60-501</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>LITERACKA 34</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-MONOPOLOWY MAGDALENA DOBROSZ</name>
          <address>63-830 PĘPOWO POWSTAŃCÓW WLKP. 15</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6961399532<br>Kod: 63-830<br>Miasto: PĘPOWO<br>Ulica: POWSTAŃCÓW WLKP. 15]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.961399532E9</value>
            </Data>
            <Data name="Kod">
              <value>63-830</value>
            </Data>
            <Data name="Miasto">
              <value>PĘPOWO</value>
            </Data>
            <Data name="Ulica">
              <value>POWSTAŃCÓW WLKP. 15</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GRZEGORZ DOLATA</name>
          <address>61-672 POZNAŃ WICHROWE WZGÓRZE, PAWILON 101</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7822167379<br>Kod: 61-672<br>Miasto: POZNAŃ<br>Ulica: WICHROWE WZGÓRZE, PAWILON 101]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822167379E9</value>
            </Data>
            <Data name="Kod">
              <value>61-672</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>WICHROWE WZGÓRZE, PAWILON 101</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MINI MARKETŁ.NOWAKOWSKI  K.NOWICKI  SPÓŁKA JAWNA</name>
          <address>63-012 DOMINOWO CENTRALNA 13</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7861698827<br>Kod: 63-012<br>Miasto: DOMINOWO<br>Ulica: CENTRALNA 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.861698827E9</value>
            </Data>
            <Data name="Kod">
              <value>63-012</value>
            </Data>
            <Data name="Miasto">
              <value>DOMINOWO</value>
            </Data>
            <Data name="Ulica">
              <value>CENTRALNA 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>AWZ SKLEP WIELOBRANZOWY ZDZISŁAW DROŻDŻ</name>
          <address>61-312 POZNAŃ SKIBOWA  9 A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7821177973<br>Kod: 61-312<br>Miasto: POZNAŃ<br>Ulica: SKIBOWA  9 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.821177973E9</value>
            </Data>
            <Data name="Kod">
              <value>61-312</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>SKIBOWA  9 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["DUKAT" SKLEP OGÓLNOSPOŻYWCZY SP.C.SKROBAŃSKA M., SKROBAŃSKI T.]]></name>
          <address>61-501 POZNAŃ DĄBRÓWKI 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7831456083<br>Kod: 61-501<br>Miasto: POZNAŃ<br>Ulica: DĄBRÓWKI 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.831456083E9</value>
            </Data>
            <Data name="Kod">
              <value>61-501</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>DĄBRÓWKI 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DZIEWIĘCKI  MIROSŁAW SKLEP SPOŻYWCZO- PRZEMYSŁOWY</name>
          <address>63-520 GRABÓW N/PROSNĄ WŁADYSŁAWA JAGIEŁŁY 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 5140108763<br>Kod: 63-520<br>Miasto: GRABÓW N/PROSNĄ<br>Ulica: WŁADYSŁAWA JAGIEŁŁY 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.140108763E9</value>
            </Data>
            <Data name="Kod">
              <value>63-520</value>
            </Data>
            <Data name="Miasto">
              <value>GRABÓW N/PROSNĄ</value>
            </Data>
            <Data name="Ulica">
              <value>WŁADYSŁAWA JAGIEŁŁY 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DZIEWIĘCKI  MIROSŁAW SKLEP SPOŻYWCZO- PRZEMYSŁOWY</name>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 5140108763<br>Kod: 63-505<br>Miasto: DORUCHÓW<br>Ulica: PRZYTOCZNICA  LOK 20]]></description>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.140108763E9</value>
            </Data>
            <Data name="Kod">
              <value>63-505</value>
            </Data>
            <Data name="Miasto">
              <value>DORUCHÓW</value>
            </Data>
            <Data name="Ulica">
              <value>PRZYTOCZNICA  LOK 20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWO USŁUGOWE  "ELIZA"  P.PIELUCHA A. MAKOWSKA SPÓŁKA JAWNA]]></name>
          <address>64-530 KAŹMIERZ JANA  PAWŁA  II  26</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7871888311<br>Kod: 64-530<br>Miasto: KAŹMIERZ<br>Ulica: JANA  PAWŁA  II  26]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.871888311E9</value>
            </Data>
            <Data name="Kod">
              <value>64-530</value>
            </Data>
            <Data name="Miasto">
              <value>KAŹMIERZ</value>
            </Data>
            <Data name="Ulica">
              <value>JANA  PAWŁA  II  26</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP WIELOBRANŻOWY "GROSIK"MACIEJ SPITALNIAK]]></name>
          <address>62-028 KOZIEGŁOWY POZNAŃSKA 15C</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7771141386<br>Kod: 62-028<br>Miasto: KOZIEGŁOWY<br>Ulica: POZNAŃSKA 15C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.771141386E9</value>
            </Data>
            <Data name="Kod">
              <value>62-028</value>
            </Data>
            <Data name="Miasto">
              <value>KOZIEGŁOWY</value>
            </Data>
            <Data name="Ulica">
              <value>POZNAŃSKA 15C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GRUPA KM LASKOWSCYSPÓŁKA JAWNA</name>
          <address>64-550 DUSZNIKI POWSTAŃCÓW WLKP. 2</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7882031436<br>Kod: 64-550<br>Miasto: DUSZNIKI<br>Ulica: POWSTAŃCÓW WLKP. 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.882031436E9</value>
            </Data>
            <Data name="Kod">
              <value>64-550</value>
            </Data>
            <Data name="Miasto">
              <value>DUSZNIKI</value>
            </Data>
            <Data name="Ulica">
              <value>POWSTAŃCÓW WLKP. 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GRUPA KM LASKOWSCYSPÓŁKA JAWNA</name>
          <address>64-310 LWÓWEK RYNEK 32</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7882031436<br>Kod: 64-310<br>Miasto: LWÓWEK<br>Ulica: RYNEK 32]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.882031436E9</value>
            </Data>
            <Data name="Kod">
              <value>64-310</value>
            </Data>
            <Data name="Miasto">
              <value>LWÓWEK</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 32</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GRUPA KM LASKOWSCYSPÓŁKA JAWNA</name>
          <address>64-510 WRONKI NOWOWIEJSKA 72B</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7882031436<br>Kod: 64-510<br>Miasto: WRONKI<br>Ulica: NOWOWIEJSKA 72B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.882031436E9</value>
            </Data>
            <Data name="Kod">
              <value>64-510</value>
            </Data>
            <Data name="Miasto">
              <value>WRONKI</value>
            </Data>
            <Data name="Ulica">
              <value>NOWOWIEJSKA 72B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ABG BARBARA GRZELAK</name>
          <address>62-004 CZERWONAK ul.GDYŃSKA  120</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6181827159<br>Kod: 62-004<br>Miasto: CZERWONAK<br>Ulica: ul.GDYŃSKA  120]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.181827159E9</value>
            </Data>
            <Data name="Kod">
              <value>62-004</value>
            </Data>
            <Data name="Miasto">
              <value>CZERWONAK</value>
            </Data>
            <Data name="Ulica">
              <value>ul.GDYŃSKA  120</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO HANDLOWE  "GRZYL" ZBIGNIEW GRZYL]]></name>
          <address>64-510 WRONKI MICKIEWICZA  10</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7630002240<br>Kod: 64-510<br>Miasto: WRONKI<br>Ulica: MICKIEWICZA  10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.63000224E9</value>
            </Data>
            <Data name="Kod">
              <value>64-510</value>
            </Data>
            <Data name="Miasto">
              <value>WRONKI</value>
            </Data>
            <Data name="Ulica">
              <value>MICKIEWICZA  10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SCH" W KORZENIEWIE SKLEP NR 13 DZIERZBIN]]></name>
          <address>62-831 KORZENIEW DZIERZBIN 78</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6180042137<br>Kod: 62-831<br>Miasto: KORZENIEW<br>Ulica: DZIERZBIN 78]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.180042137E9</value>
            </Data>
            <Data name="Kod">
              <value>62-831</value>
            </Data>
            <Data name="Miasto">
              <value>KORZENIEW</value>
            </Data>
            <Data name="Ulica">
              <value>DZIERZBIN 78</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SCH" W KORZENIEWIW SKLEP NR 2KOŚCIELEC]]></name>
          <address>62-831 KORZENIEW KOŚCIELEC 13</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6180042137<br>Kod: 62-831<br>Miasto: KORZENIEW<br>Ulica: KOŚCIELEC 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.180042137E9</value>
            </Data>
            <Data name="Kod">
              <value>62-831</value>
            </Data>
            <Data name="Miasto">
              <value>KORZENIEW</value>
            </Data>
            <Data name="Ulica">
              <value>KOŚCIELEC 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓLDZIELNIA "SCH" W KORZENIEWIE SKLEP NR 9W MYCIELINIE]]></name>
          <address>62-831 KORZENIEW MYCIELIN  22</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6180042137<br>Kod: 62-831<br>Miasto: KORZENIEW<br>Ulica: MYCIELIN  22]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.180042137E9</value>
            </Data>
            <Data name="Kod">
              <value>62-831</value>
            </Data>
            <Data name="Miasto">
              <value>KORZENIEW</value>
            </Data>
            <Data name="Ulica">
              <value>MYCIELIN  22</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA"W  PRZYGRODZICACH]]></name>
          <address>63-421 PRZYGODZICE WROCŁAWSKA 3 ANTONIN</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6220005698<br>Kod: 63-421<br>Miasto: PRZYGODZICE<br>Ulica: WROCŁAWSKA 3 ANTONIN]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220005698E9</value>
            </Data>
            <Data name="Kod">
              <value>63-421</value>
            </Data>
            <Data name="Miasto">
              <value>PRZYGODZICE</value>
            </Data>
            <Data name="Ulica">
              <value>WROCŁAWSKA 3 ANTONIN</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA"W  PRZYGRODZICACH]]></name>
          <address>63-421 PRZYGODZICE CHYNOWA 115 CHYNOWA</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6220005698<br>Kod: 63-421<br>Miasto: PRZYGODZICE<br>Ulica: CHYNOWA 115 CHYNOWA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220005698E9</value>
            </Data>
            <Data name="Kod">
              <value>63-421</value>
            </Data>
            <Data name="Miasto">
              <value>PRZYGODZICE</value>
            </Data>
            <Data name="Ulica">
              <value>CHYNOWA 115 CHYNOWA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GMINNA SPÓŁDZIELNIA SAMOPOMOC CHŁOPSKA SKLEP NR 1 DELIKATESY</name>
          <address>63-505 DORUCHÓW OSTRZESZOWSKA 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6220105402<br>Kod: 63-505<br>Miasto: DORUCHÓW<br>Ulica: OSTRZESZOWSKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220105402E9</value>
            </Data>
            <Data name="Kod">
              <value>63-505</value>
            </Data>
            <Data name="Miasto">
              <value>DORUCHÓW</value>
            </Data>
            <Data name="Ulica">
              <value>OSTRZESZOWSKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GMINNA SPÓŁDZIELNIA SAMOPOMOC CHŁOPSKA SKLEP NR 14DELIKATESY</name>
          <address>63-505 DORUCHÓW OSTRZESZOWSKA 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6220105402<br>Kod: 63-505<br>Miasto: DORUCHÓW<br>Ulica: OSTRZESZOWSKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220105402E9</value>
            </Data>
            <Data name="Kod">
              <value>63-505</value>
            </Data>
            <Data name="Miasto">
              <value>DORUCHÓW</value>
            </Data>
            <Data name="Ulica">
              <value>OSTRZESZOWSKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA"]]></name>
          <address>62-872 GODZIESZE WIELKIE MAJA  24</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6180042172<br>Kod: 62-872<br>Miasto: GODZIESZE WIELKIE<br>Ulica: MAJA  24]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.180042172E9</value>
            </Data>
            <Data name="Kod">
              <value>62-872</value>
            </Data>
            <Data name="Miasto">
              <value>GODZIESZE WIELKIE</value>
            </Data>
            <Data name="Ulica">
              <value>MAJA  24</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GS KÓRNIK "TECZA"]]></name>
          <address>61-061 KÓRNIK PL.NIEPODLEGLOSCI 15</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7850002236<br>Kod: 61-061<br>Miasto: KÓRNIK<br>Ulica: PL.NIEPODLEGLOSCI 15]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.850002236E9</value>
            </Data>
            <Data name="Kod">
              <value>61-061</value>
            </Data>
            <Data name="Miasto">
              <value>KÓRNIK</value>
            </Data>
            <Data name="Ulica">
              <value>PL.NIEPODLEGLOSCI 15</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAMOPOMOC CHŁOPSKA GS MIĘDZYCHÓD</name>
          <address>64-400 MIĘDZYCHÓD GEN. SIKORSKIEGO 16</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 5950000098<br>Kod: 64-400<br>Miasto: MIĘDZYCHÓD<br>Ulica: GEN. SIKORSKIEGO 16]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.950000098E9</value>
            </Data>
            <Data name="Kod">
              <value>64-400</value>
            </Data>
            <Data name="Miasto">
              <value>MIĘDZYCHÓD</value>
            </Data>
            <Data name="Ulica">
              <value>GEN. SIKORSKIEGO 16</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAMOPOMOC CHŁOPSKA GS MIĘDZYCHÓDSKLEP  NR 8</name>
          <address>64-400 MIĘDZYCHÓD BIELSKO, UL. KWIATOWA 13</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 5950000098<br>Kod: 64-400<br>Miasto: MIĘDZYCHÓD<br>Ulica: BIELSKO, UL. KWIATOWA 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.950000098E9</value>
            </Data>
            <Data name="Kod">
              <value>64-400</value>
            </Data>
            <Data name="Miasto">
              <value>MIĘDZYCHÓD</value>
            </Data>
            <Data name="Ulica">
              <value>BIELSKO, UL. KWIATOWA 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAMOPOMOC CHŁOPSKA GS MIĘDZYCHÓDSKLEP  NR 8</name>
          <address>64-426 ŁOWYŃ MIĘDZYCHODZKA 2</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 5950000098<br>Kod: 64-426<br>Miasto: ŁOWYŃ<br>Ulica: MIĘDZYCHODZKA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.950000098E9</value>
            </Data>
            <Data name="Kod">
              <value>64-426</value>
            </Data>
            <Data name="Miasto">
              <value>ŁOWYŃ</value>
            </Data>
            <Data name="Ulica">
              <value>MIĘDZYCHODZKA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA" W ODOLANOWIE]]></name>
          <address>63-430 BONIKÓW DŁUGA 22</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6220109067<br>Kod: 63-430<br>Miasto: BONIKÓW<br>Ulica: DŁUGA 22]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220109067E9</value>
            </Data>
            <Data name="Kod">
              <value>63-430</value>
            </Data>
            <Data name="Miasto">
              <value>BONIKÓW</value>
            </Data>
            <Data name="Ulica">
              <value>DŁUGA 22</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA" W ODOLANOWIE]]></name>
          <address>63-435 GRANOWIEC ODOLANOWSKA 29</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6220109067<br>Kod: 63-435<br>Miasto: GRANOWIEC<br>Ulica: ODOLANOWSKA 29]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220109067E9</value>
            </Data>
            <Data name="Kod">
              <value>63-435</value>
            </Data>
            <Data name="Miasto">
              <value>GRANOWIEC</value>
            </Data>
            <Data name="Ulica">
              <value>ODOLANOWSKA 29</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA" W ODOLANOWIE]]></name>
          <address>63-430 ŚWIECA ŚWIECA 34</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6220109067<br>Kod: 63-430<br>Miasto: ŚWIECA<br>Ulica: ŚWIECA 34]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220109067E9</value>
            </Data>
            <Data name="Kod">
              <value>63-430</value>
            </Data>
            <Data name="Miasto">
              <value>ŚWIECA</value>
            </Data>
            <Data name="Ulica">
              <value>ŚWIECA 34</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA" W ODOLANOWIE]]></name>
          <address>63-430 TARCHAŁY WIELKIE STRAŻACKA 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6220109067<br>Kod: 63-430<br>Miasto: TARCHAŁY WIELKIE<br>Ulica: STRAŻACKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220109067E9</value>
            </Data>
            <Data name="Kod">
              <value>63-430</value>
            </Data>
            <Data name="Miasto">
              <value>TARCHAŁY WIELKIE</value>
            </Data>
            <Data name="Ulica">
              <value>STRAŻACKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA  SPÓLDZIELNIA"SAMOPOMOC  CHŁOPSKA"]]></name>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7870000223<br>Kod: 62-400<br>Miasto: SIERAKÓW<br>Ulica: GÓRA 45]]></description>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870000223E9</value>
            </Data>
            <Data name="Kod">
              <value>62-400</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAKÓW</value>
            </Data>
            <Data name="Ulica">
              <value>GÓRA 45</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA" SZCZYTNIKI Z SIEDZIBĄ W RADLICZYCACH]]></name>
          <address>62-865 SZCZYTNIKI LOKAL 31</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6180042226<br>Kod: 62-865<br>Miasto: SZCZYTNIKI<br>Ulica: LOKAL 31]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.180042226E9</value>
            </Data>
            <Data name="Kod">
              <value>62-865</value>
            </Data>
            <Data name="Miasto">
              <value>SZCZYTNIKI</value>
            </Data>
            <Data name="Ulica">
              <value>LOKAL 31</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA" SZCZYTNIKI Z SIEDZIBĄ W RADLICZYCACH]]></name>
          <address>62-865 SZCZYTNIKI RADLICZYCE  46</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6180042226<br>Kod: 62-865<br>Miasto: SZCZYTNIKI<br>Ulica: RADLICZYCE  46]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.180042226E9</value>
            </Data>
            <Data name="Kod">
              <value>62-865</value>
            </Data>
            <Data name="Miasto">
              <value>SZCZYTNIKI</value>
            </Data>
            <Data name="Ulica">
              <value>RADLICZYCE  46</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>IS NAVI TORR SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</name>
          <address>62-090 ROKIETNICA TRAKT NAPOLEOŃSKI 11</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7773105986<br>Kod: 62-090<br>Miasto: ROKIETNICA<br>Ulica: TRAKT NAPOLEOŃSKI 11]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.773105986E9</value>
            </Data>
            <Data name="Kod">
              <value>62-090</value>
            </Data>
            <Data name="Miasto">
              <value>ROKIETNICA</value>
            </Data>
            <Data name="Ulica">
              <value>TRAKT NAPOLEOŃSKI 11</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[CUKIERNIA "JAGÓDKA" KRZYSZTOF MOHOŃ]]></name>
          <address>60-682 POZNAŃ OS BOLESŁAWA ŚMIAŁEGO 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7780043163<br>Kod: 60-682<br>Miasto: POZNAŃ<br>Ulica: OS BOLESŁAWA ŚMIAŁEGO 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.780043163E9</value>
            </Data>
            <Data name="Kod">
              <value>60-682</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>OS BOLESŁAWA ŚMIAŁEGO 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO-USŁUGOWA JANKOWSKI ŁUKASZ</name>
          <address>62-306 GRABOWO KRÓLEWSKIE GRABOWO KRÓLEWSKIE 13/2</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7891633933<br>Kod: 62-306<br>Miasto: GRABOWO KRÓLEWSKIE<br>Ulica: GRABOWO KRÓLEWSKIE 13/2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.891633933E9</value>
            </Data>
            <Data name="Kod">
              <value>62-306</value>
            </Data>
            <Data name="Miasto">
              <value>GRABOWO KRÓLEWSKIE</value>
            </Data>
            <Data name="Ulica">
              <value>GRABOWO KRÓLEWSKIE 13/2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO-USŁUGOWA JANKOWSKI ŁUKASZ</name>
          <address>62-323 CHWALIBOGOWO CHWALIBOGOWO  19/1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7891633933<br>Kod: 62-323<br>Miasto: CHWALIBOGOWO<br>Ulica: CHWALIBOGOWO  19/1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.891633933E9</value>
            </Data>
            <Data name="Kod">
              <value>62-323</value>
            </Data>
            <Data name="Miasto">
              <value>CHWALIBOGOWO</value>
            </Data>
            <Data name="Ulica">
              <value>CHWALIBOGOWO  19/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO-USŁUGOWA JANKOWSKI ŁUKASZ</name>
          <address>62-300 PSARYPOLSKIE PSARY POLSKIE 126</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7891633933<br>Kod: 62-300<br>Miasto: PSARYPOLSKIE<br>Ulica: PSARY POLSKIE 126]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.891633933E9</value>
            </Data>
            <Data name="Kod">
              <value>62-300</value>
            </Data>
            <Data name="Miasto">
              <value>PSARYPOLSKIE</value>
            </Data>
            <Data name="Ulica">
              <value>PSARY POLSKIE 126</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>Z.P.H. JAURA S.C.</name>
          <address>63-440 RASZKÓW RYNEK 28</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6221037720<br>Kod: 63-440<br>Miasto: RASZKÓW<br>Ulica: RYNEK 28]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.22103772E9</value>
            </Data>
            <Data name="Kod">
              <value>63-440</value>
            </Data>
            <Data name="Miasto">
              <value>RASZKÓW</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 28</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPHU "JEDYNKA" S.C. ANNA MAĆKOWSKA,MARCIN MAĆKOWSKI]]></name>
          <address>64-300 NOWY TOMYŚL PL. F. CHOPINA 8</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7881835339<br>Kod: 64-300<br>Miasto: NOWY TOMYŚL<br>Ulica: PL. F. CHOPINA 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.881835339E9</value>
            </Data>
            <Data name="Kod">
              <value>64-300</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY TOMYŚL</value>
            </Data>
            <Data name="Ulica">
              <value>PL. F. CHOPINA 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWA MARCIN JEZIERSKI</name>
          <address>64-610 ROGOŹNO WOJSKA POLSKIEGO  46</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6060023137<br>Kod: 64-610<br>Miasto: ROGOŹNO<br>Ulica: WOJSKA POLSKIEGO  46]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.060023137E9</value>
            </Data>
            <Data name="Kod">
              <value>64-610</value>
            </Data>
            <Data name="Miasto">
              <value>ROGOŹNO</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA POLSKIEGO  46</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY JULIUSZ JĘDRZEJCZAK</name>
          <address>64-840 BUDZYŃ PRZEMYSŁOWA  10 A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7661041206<br>Kod: 64-840<br>Miasto: BUDZYŃ<br>Ulica: PRZEMYSŁOWA  10 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661041206E9</value>
            </Data>
            <Data name="Kod">
              <value>64-840</value>
            </Data>
            <Data name="Miasto">
              <value>BUDZYŃ</value>
            </Data>
            <Data name="Ulica">
              <value>PRZEMYSŁOWA  10 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY KAROLINA JĘDRZEJCZAK</name>
          <address>64-830 MARGONIN KOŚCIELNA 9</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7661903659<br>Kod: 64-830<br>Miasto: MARGONIN<br>Ulica: KOŚCIELNA 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661903659E9</value>
            </Data>
            <Data name="Kod">
              <value>64-830</value>
            </Data>
            <Data name="Miasto">
              <value>MARGONIN</value>
            </Data>
            <Data name="Ulica">
              <value>KOŚCIELNA 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY MARZANNA JĘDRZEJCZAK</name>
          <address>62-100 WĄGROWIEC JEŻYKA  48</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7661196989<br>Kod: 62-100<br>Miasto: WĄGROWIEC<br>Ulica: JEŻYKA  48]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661196989E9</value>
            </Data>
            <Data name="Kod">
              <value>62-100</value>
            </Data>
            <Data name="Miasto">
              <value>WĄGROWIEC</value>
            </Data>
            <Data name="Ulica">
              <value>JEŻYKA  48</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY MARZANNA JĘDRZEJCZAK</name>
          <address>64-510 WRONKI MICKIEWICZA  75</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7661196989<br>Kod: 64-510<br>Miasto: WRONKI<br>Ulica: MICKIEWICZA  75]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661196989E9</value>
            </Data>
            <Data name="Kod">
              <value>64-510</value>
            </Data>
            <Data name="Miasto">
              <value>WRONKI</value>
            </Data>
            <Data name="Ulica">
              <value>MICKIEWICZA  75</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY JULIUSZ JĘDRZEJCZAK</name>
          <address>62-100 WĄGROWIEC ŚW. WOJCIECHA 17</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7661041206<br>Kod: 62-100<br>Miasto: WĄGROWIEC<br>Ulica: ŚW. WOJCIECHA 17]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661041206E9</value>
            </Data>
            <Data name="Kod">
              <value>62-100</value>
            </Data>
            <Data name="Miasto">
              <value>WĄGROWIEC</value>
            </Data>
            <Data name="Ulica">
              <value>ŚW. WOJCIECHA 17</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY JULIUSZ JĘDRZEJCZAK</name>
          <address>64-700 CZARNKÓW SIKORSKIEGO  2</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7661041206<br>Kod: 64-700<br>Miasto: CZARNKÓW<br>Ulica: SIKORSKIEGO  2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661041206E9</value>
            </Data>
            <Data name="Kod">
              <value>64-700</value>
            </Data>
            <Data name="Miasto">
              <value>CZARNKÓW</value>
            </Data>
            <Data name="Ulica">
              <value>SIKORSKIEGO  2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY JULIUSZ JĘDRZEJCZAK</name>
          <address>62-100 WĄGROWIEC 11 LISTOPADA 3</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7661041206<br>Kod: 62-100<br>Miasto: WĄGROWIEC<br>Ulica: 11 LISTOPADA 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661041206E9</value>
            </Data>
            <Data name="Kod">
              <value>62-100</value>
            </Data>
            <Data name="Miasto">
              <value>WĄGROWIEC</value>
            </Data>
            <Data name="Ulica">
              <value>11 LISTOPADA 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO PRODUKCYJNO HANDLOWO USŁUGOWE KAJA  SPÓŁKA JAWNA KRYSTYNA PAWLIKOWSKA, PAULINA KLIM</name>
          <address>61-215 POZNAŃ OS.POWST.NARODOWYCH 33</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7822226828<br>Kod: 61-215<br>Miasto: POZNAŃ<br>Ulica: OS.POWST.NARODOWYCH 33]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822226828E9</value>
            </Data>
            <Data name="Kod">
              <value>61-215</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>OS.POWST.NARODOWYCH 33</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY KAJMAK</name>
          <address>61-314 POZNAŃ MICHAŁOWO 27</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7842497370<br>Kod: 61-314<br>Miasto: POZNAŃ<br>Ulica: MICHAŁOWO 27]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.84249737E9</value>
            </Data>
            <Data name="Kod">
              <value>61-314</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>MICHAŁOWO 27</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DOM HANDLOWY KAROLINKA ROMAN BŁASZAK</name>
          <address>64-932 STARA ŁUBIANKA PARKOWA 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7651140415<br>Kod: 64-932<br>Miasto: STARA ŁUBIANKA<br>Ulica: PARKOWA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.651140415E9</value>
            </Data>
            <Data name="Kod">
              <value>64-932</value>
            </Data>
            <Data name="Miasto">
              <value>STARA ŁUBIANKA</value>
            </Data>
            <Data name="Ulica">
              <value>PARKOWA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDLOWE ZACISZE ANNA KASZTELAN</name>
          <address>64-980 TRZCIANKA OSIEDLE ZACISZE 12</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7631407364<br>Kod: 64-980<br>Miasto: TRZCIANKA<br>Ulica: OSIEDLE ZACISZE 12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.631407364E9</value>
            </Data>
            <Data name="Kod">
              <value>64-980</value>
            </Data>
            <Data name="Miasto">
              <value>TRZCIANKA</value>
            </Data>
            <Data name="Ulica">
              <value>OSIEDLE ZACISZE 12</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO PRODUKCYJNO HANDLOWE "KASZTELAN" SPOŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ]]></name>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6681934177<br>Kod: 62-700<br>Miasto: WŁADYSŁAWÓW<br>Ulica: CHYLIN  W LOKALU 86C]]></description>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.681934177E9</value>
            </Data>
            <Data name="Kod">
              <value>62-700</value>
            </Data>
            <Data name="Miasto">
              <value>WŁADYSŁAWÓW</value>
            </Data>
            <Data name="Ulica">
              <value>CHYLIN  W LOKALU 86C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KOŁODZIEJCZAK BOGDANSKLEP SPOŻYWCZO - PRZEMYSŁOWY</name>
          <address>62-571 STARE MIASTO BARCZYGŁÓW, UL. GRODZIECKA 61</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-571<br>Miasto: STARE MIASTO<br>Ulica: BARCZYGŁÓW, UL. GRODZIECKA 61]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.650019409E9</value>
            </Data>
            <Data name="Kod">
              <value>62-571</value>
            </Data>
            <Data name="Miasto">
              <value>STARE MIASTO</value>
            </Data>
            <Data name="Ulica">
              <value>BARCZYGŁÓW, UL. GRODZIECKA 61</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KOŁODZIEJCZAK BOGDANSKLEP SPOŻYWCZO - PRZEMYSŁOWY</name>
          <address>62-500 KONIN PIŁSUDSKIEGO 16 A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-500<br>Miasto: KONIN<br>Ulica: PIŁSUDSKIEGO 16 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.650019409E9</value>
            </Data>
            <Data name="Kod">
              <value>62-500</value>
            </Data>
            <Data name="Miasto">
              <value>KONIN</value>
            </Data>
            <Data name="Ulica">
              <value>PIŁSUDSKIEGO 16 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KOŁODZIEJCZAK BOGDANSKLEP SPOŻYWCZO - PRZEMYSŁOWY</name>
          <address>62-512 BRZEŹNO KONIŃSKA  18</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-512<br>Miasto: BRZEŹNO<br>Ulica: KONIŃSKA  18]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.650019409E9</value>
            </Data>
            <Data name="Kod">
              <value>62-512</value>
            </Data>
            <Data name="Miasto">
              <value>BRZEŹNO</value>
            </Data>
            <Data name="Ulica">
              <value>KONIŃSKA  18</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KOŁODZIEJCZAK BOGDANSKLEP SPOŻYWCZO - PRZEMYSŁOWY</name>
          <address>62-500 KONIN PLAC GÓRNIKA 4</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-500<br>Miasto: KONIN<br>Ulica: PLAC GÓRNIKA 4]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.650019409E9</value>
            </Data>
            <Data name="Kod">
              <value>62-500</value>
            </Data>
            <Data name="Miasto">
              <value>KONIN</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC GÓRNIKA 4</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KOŁODZIEJCZAK BOGDANSKLEP SPOŻYWCZO -  PRZEMYSŁOWY</name>
          <address>62-571 KRĄGOLA STRAŻACKA  22</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-571<br>Miasto: KRĄGOLA<br>Ulica: STRAŻACKA  22]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.650019409E9</value>
            </Data>
            <Data name="Kod">
              <value>62-571</value>
            </Data>
            <Data name="Miasto">
              <value>KRĄGOLA</value>
            </Data>
            <Data name="Ulica">
              <value>STRAŻACKA  22</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KOŁODZIEJCZAK BOGDANSKLEP SPOŻYWCZO - PRZEMYSŁOWY</name>
          <address>62-510 KONIN NOWOWIEJSKIEGO 1  A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-510<br>Miasto: KONIN<br>Ulica: NOWOWIEJSKIEGO 1  A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.650019409E9</value>
            </Data>
            <Data name="Kod">
              <value>62-510</value>
            </Data>
            <Data name="Miasto">
              <value>KONIN</value>
            </Data>
            <Data name="Ulica">
              <value>NOWOWIEJSKIEGO 1  A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL MARCIN KOŁTONIAK</name>
          <address>63-112 BRODNICA GRZYBNO 41</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7851665602<br>Kod: 63-112<br>Miasto: BRODNICA<br>Ulica: GRZYBNO 41]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.851665602E9</value>
            </Data>
            <Data name="Kod">
              <value>63-112</value>
            </Data>
            <Data name="Miasto">
              <value>BRODNICA</value>
            </Data>
            <Data name="Ulica">
              <value>GRZYBNO 41</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL MARCIN KOŁTONIAK</name>
          <address>64-000 OBORZYSKA STARE KOLEJOWA 3</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7851665602<br>Kod: 64-000<br>Miasto: OBORZYSKA STARE<br>Ulica: KOLEJOWA 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.851665602E9</value>
            </Data>
            <Data name="Kod">
              <value>64-000</value>
            </Data>
            <Data name="Miasto">
              <value>OBORZYSKA STARE</value>
            </Data>
            <Data name="Ulica">
              <value>KOLEJOWA 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["KONTRA" PRZEDSIĘBIORSTWO HANDLOWO-USŁUGOWE PAWEŁ KACZMAREK, PIOTR KACZMAREK SPÓŁKA JAWNA]]></name>
          <address>60-185 SKÓRZEWO POZNAŃSKA 74</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7790021068<br>Kod: 60-185<br>Miasto: SKÓRZEWO<br>Ulica: POZNAŃSKA 74]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.790021068E9</value>
            </Data>
            <Data name="Kod">
              <value>60-185</value>
            </Data>
            <Data name="Miasto">
              <value>SKÓRZEWO</value>
            </Data>
            <Data name="Ulica">
              <value>POZNAŃSKA 74</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["KONTRA" PRZEDSIĘBIORSTWO HANDLOWO-USŁUGOWE PAWEŁ KACZMAREK, PIOTR KACZMAREK SPÓŁKA JAWNA]]></name>
          <address>60-185 SKÓRZEWO BRATNIA 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7790021068<br>Kod: 60-185<br>Miasto: SKÓRZEWO<br>Ulica: BRATNIA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.790021068E9</value>
            </Data>
            <Data name="Kod">
              <value>60-185</value>
            </Data>
            <Data name="Miasto">
              <value>SKÓRZEWO</value>
            </Data>
            <Data name="Ulica">
              <value>BRATNIA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["KONTRA" PRZEDSIĘBIORSTWO HANDLOWO USŁUGOWE PAWEŁ KACZMAREK, PIOTR KACZMAREK SPÓŁKA JAWNA]]></name>
          <address>62-081 PRZEŹMIEROWO RYNKOWA 142/144</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7790021068<br>Kod: 62-081<br>Miasto: PRZEŹMIEROWO<br>Ulica: RYNKOWA 142/144]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.790021068E9</value>
            </Data>
            <Data name="Kod">
              <value>62-081</value>
            </Data>
            <Data name="Miasto">
              <value>PRZEŹMIEROWO</value>
            </Data>
            <Data name="Ulica">
              <value>RYNKOWA 142/144</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["KONTRA" PRZEDSIĘBIORSTWO HANDLOWO-USŁUGOWE PAWEŁ KACZMAREK, PIOTR KACZMAREK SPÓŁKA JAWNA]]></name>
          <address>62-069 DĄBROWA SZAFIROWA 1 A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7790021068<br>Kod: 62-069<br>Miasto: DĄBROWA<br>Ulica: SZAFIROWA 1 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.790021068E9</value>
            </Data>
            <Data name="Kod">
              <value>62-069</value>
            </Data>
            <Data name="Miasto">
              <value>DĄBROWA</value>
            </Data>
            <Data name="Ulica">
              <value>SZAFIROWA 1 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU EWA KRUK</name>
          <address>62-080 RUMIANEK SZKOLNA 97/5</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7771782607<br>Kod: 62-080<br>Miasto: RUMIANEK<br>Ulica: SZKOLNA 97/5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.771782607E9</value>
            </Data>
            <Data name="Kod">
              <value>62-080</value>
            </Data>
            <Data name="Miasto">
              <value>RUMIANEK</value>
            </Data>
            <Data name="Ulica">
              <value>SZKOLNA 97/5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWO - USŁUGOWO - PRODUKCYJNE KRZYŻYŃSKI MACIEJ</name>
          <address>64-110 ŚWIĘCIECHOWA RYNEK 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6971516028<br>Kod: 64-110<br>Miasto: ŚWIĘCIECHOWA<br>Ulica: RYNEK 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.971516028E9</value>
            </Data>
            <Data name="Kod">
              <value>64-110</value>
            </Data>
            <Data name="Miasto">
              <value>ŚWIĘCIECHOWA</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWO - USŁUGOWO -PRODUKCYJNE KRZYŻYŃSKI MACIEJ</name>
          <address>64-113 śWIERCZYNA ŚWIERCZYNA 100F</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6971516028<br>Kod: 64-113<br>Miasto: śWIERCZYNA<br>Ulica: ŚWIERCZYNA 100F]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.971516028E9</value>
            </Data>
            <Data name="Kod">
              <value>64-113</value>
            </Data>
            <Data name="Miasto">
              <value>śWIERCZYNA</value>
            </Data>
            <Data name="Ulica">
              <value>ŚWIERCZYNA 100F</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY EWA KUJAWA-MISCH</name>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7881687011<br>Kod: 64-300<br>Miasto: NOWY TOMYŚL<br>Ulica: 3-GO STYCZNIA 6]]></description>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.881687011E9</value>
            </Data>
            <Data name="Kod">
              <value>64-300</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY TOMYŚL</value>
            </Data>
            <Data name="Ulica">
              <value>3-GO STYCZNIA 6</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HURT-DETAL ART.SPOŻYWCZYMI I PRZEMYSŁOWYMI SP.C.H. MAJCHRZAK M.D. KUŹMA</name>
          <address>63-100 ŚREM NOCHOWO  UL.ŚREMSKA 10</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7850005559<br>Kod: 63-100<br>Miasto: ŚREM<br>Ulica: NOCHOWO  UL.ŚREMSKA 10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.850005559E9</value>
            </Data>
            <Data name="Kod">
              <value>63-100</value>
            </Data>
            <Data name="Miasto">
              <value>ŚREM</value>
            </Data>
            <Data name="Ulica">
              <value>NOCHOWO  UL.ŚREMSKA 10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>K.M. LASKOWSCY S.C.</name>
          <address>64-316 KUŚLIN E.SCZANIECKIEJ 23 MICHORZEWO</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7882001004<br>Kod: 64-316<br>Miasto: KUŚLIN<br>Ulica: E.SCZANIECKIEJ 23 MICHORZEWO]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.882001004E9</value>
            </Data>
            <Data name="Kod">
              <value>64-316</value>
            </Data>
            <Data name="Miasto">
              <value>KUŚLIN</value>
            </Data>
            <Data name="Ulica">
              <value>E.SCZANIECKIEJ 23 MICHORZEWO</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>K.M LASKOWSCY S.C.</name>
          <address>64-316 KUŚLIN E. SZCZANIECKIEJ 14 A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7882001004<br>Kod: 64-316<br>Miasto: KUŚLIN<br>Ulica: E. SZCZANIECKIEJ 14 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.882001004E9</value>
            </Data>
            <Data name="Kod">
              <value>64-316</value>
            </Data>
            <Data name="Miasto">
              <value>KUŚLIN</value>
            </Data>
            <Data name="Ulica">
              <value>E. SZCZANIECKIEJ 14 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MARIUSZ LASKOWSKI</name>
          <address>64-305 BOLEWICE NOWA 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7881168989<br>Kod: 64-305<br>Miasto: BOLEWICE<br>Ulica: NOWA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.881168989E9</value>
            </Data>
            <Data name="Kod">
              <value>64-305</value>
            </Data>
            <Data name="Miasto">
              <value>BOLEWICE</value>
            </Data>
            <Data name="Ulica">
              <value>NOWA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[CUKIERNIA-PIEKARNIA "ŁAWICA"  S.C.DANUTA I TAMARA BRIAŃSKA]]></name>
          <address>60-189 POZNAŃ ZŁOTOWSKA 45</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7791577299<br>Kod: 60-189<br>Miasto: POZNAŃ<br>Ulica: ZŁOTOWSKA 45]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.791577299E9</value>
            </Data>
            <Data name="Kod">
              <value>60-189</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>ZŁOTOWSKA 45</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWA USŁUGI, PRODUKCJA KICAL ILONA</name>
          <address>64-500 SZAMOTUŁY ALEJA 1  MAJA 32</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7871969771<br>Kod: 64-500<br>Miasto: SZAMOTUŁY<br>Ulica: ALEJA 1  MAJA 32]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.871969771E9</value>
            </Data>
            <Data name="Kod">
              <value>64-500</value>
            </Data>
            <Data name="Miasto">
              <value>SZAMOTUŁY</value>
            </Data>
            <Data name="Ulica">
              <value>ALEJA 1  MAJA 32</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWA ANNA ŁUSIEWICZ</name>
          <address>64-500 SZAMOTUŁY SPÓŁDZIELCZA 1A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7870005025<br>Kod: 64-500<br>Miasto: SZAMOTUŁY<br>Ulica: SPÓŁDZIELCZA 1A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870005025E9</value>
            </Data>
            <Data name="Kod">
              <value>64-500</value>
            </Data>
            <Data name="Miasto">
              <value>SZAMOTUŁY</value>
            </Data>
            <Data name="Ulica">
              <value>SPÓŁDZIELCZA 1A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GOOD TASTE   ROBERT MACHNICKI</name>
          <address>62-081 PRZEŹMIEROWO RYNKOWA 75 C</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 9720885675<br>Kod: 62-081<br>Miasto: PRZEŹMIEROWO<br>Ulica: RYNKOWA 75 C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>9.720885675E9</value>
            </Data>
            <Data name="Kod">
              <value>62-081</value>
            </Data>
            <Data name="Miasto">
              <value>PRZEŹMIEROWO</value>
            </Data>
            <Data name="Ulica">
              <value>RYNKOWA 75 C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZY EWA MAĆCZAK</name>
          <address>62-820 STAWISZYN SZOSA  PLESZEWSKA 2A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 9680002763<br>Kod: 62-820<br>Miasto: STAWISZYN<br>Ulica: SZOSA  PLESZEWSKA 2A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>9.680002763E9</value>
            </Data>
            <Data name="Kod">
              <value>62-820</value>
            </Data>
            <Data name="Miasto">
              <value>STAWISZYN</value>
            </Data>
            <Data name="Ulica">
              <value>SZOSA  PLESZEWSKA 2A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PPHU MAĆKOWSCY S.A.MICHAŁ MAĆKOWSKI  HANNA MAĆKOWSKA</name>
          <address>64-300 NOWY TOMYŚL OS.BATOREGO  53</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7880022315<br>Kod: 64-300<br>Miasto: NOWY TOMYŚL<br>Ulica: OS.BATOREGO  53]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.880022315E9</value>
            </Data>
            <Data name="Kod">
              <value>64-300</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY TOMYŚL</value>
            </Data>
            <Data name="Ulica">
              <value>OS.BATOREGO  53</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MADO MAGDALENA DOLATA</name>
          <address>61-031 POZNAŃ WARSZAWSKA 93</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7891540048<br>Kod: 61-031<br>Miasto: POZNAŃ<br>Ulica: WARSZAWSKA 93]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.891540048E9</value>
            </Data>
            <Data name="Kod">
              <value>61-031</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>WARSZAWSKA 93</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO - PRZEMYSŁOWY MATEUSZ MAGDZIAREK</name>
          <address>63-421 PRZYGODZICE OSTROWSKA 13 DĘBNICA</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6172065336<br>Kod: 63-421<br>Miasto: PRZYGODZICE<br>Ulica: OSTROWSKA 13 DĘBNICA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.172065336E9</value>
            </Data>
            <Data name="Kod">
              <value>63-421</value>
            </Data>
            <Data name="Miasto">
              <value>PRZYGODZICE</value>
            </Data>
            <Data name="Ulica">
              <value>OSTROWSKA 13 DĘBNICA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MAGDZIAREK ANDRZEJ SKLEP SPOŻYWCZY</name>
          <address>63-330 DOBRZYCA RÓŻANA 7</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6211005687<br>Kod: 63-330<br>Miasto: DOBRZYCA<br>Ulica: RÓŻANA 7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.211005687E9</value>
            </Data>
            <Data name="Kod">
              <value>63-330</value>
            </Data>
            <Data name="Miasto">
              <value>DOBRZYCA</value>
            </Data>
            <Data name="Ulica">
              <value>RÓŻANA 7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MAGDZIAREK ANDRZEJ SKLEP SPOŻYWCZY</name>
          <address>63-300 PLESZEW KOŚCIELNA 4, KOWALEW</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6211005687<br>Kod: 63-300<br>Miasto: PLESZEW<br>Ulica: KOŚCIELNA 4, KOWALEW]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.211005687E9</value>
            </Data>
            <Data name="Kod">
              <value>63-300</value>
            </Data>
            <Data name="Miasto">
              <value>PLESZEW</value>
            </Data>
            <Data name="Ulica">
              <value>KOŚCIELNA 4, KOWALEW</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO - PRZEMYSŁOWY MATEUSZ MAGDZIAREK</name>
          <address>63-330 DOBRZYCA SOŚNICA  33 A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6172065336<br>Kod: 63-330<br>Miasto: DOBRZYCA<br>Ulica: SOŚNICA  33 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.172065336E9</value>
            </Data>
            <Data name="Kod">
              <value>63-330</value>
            </Data>
            <Data name="Miasto">
              <value>DOBRZYCA</value>
            </Data>
            <Data name="Ulica">
              <value>SOŚNICA  33 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO - PRZEMYSŁOWY MATEUSZ MAGDZIAREK</name>
          <address>63-230 WITASZYCE KOLEJOWA 19</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6172065336<br>Kod: 63-230<br>Miasto: WITASZYCE<br>Ulica: KOLEJOWA 19]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.172065336E9</value>
            </Data>
            <Data name="Kod">
              <value>63-230</value>
            </Data>
            <Data name="Miasto">
              <value>WITASZYCE</value>
            </Data>
            <Data name="Ulica">
              <value>KOLEJOWA 19</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO - PRZEMYSŁOWY MATEUSZ MAGDZIAREK</name>
          <address>63-400 OSTRÓW WIELKOPOLSKI MELCHIORA  WAŃKOWICZA 7</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6172065336<br>Kod: 63-400<br>Miasto: OSTRÓW WIELKOPOLSKI<br>Ulica: MELCHIORA  WAŃKOWICZA 7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.172065336E9</value>
            </Data>
            <Data name="Kod">
              <value>63-400</value>
            </Data>
            <Data name="Miasto">
              <value>OSTRÓW WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>MELCHIORA  WAŃKOWICZA 7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO - PRZEMYSŁOWY MATEUSZ MAGDZIAREK</name>
          <address>63-400 OSTRÓW WIELKOPOLSKI B.LIMANOWSKIEGO 69</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6172065336<br>Kod: 63-400<br>Miasto: OSTRÓW WIELKOPOLSKI<br>Ulica: B.LIMANOWSKIEGO 69]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.172065336E9</value>
            </Data>
            <Data name="Kod">
              <value>63-400</value>
            </Data>
            <Data name="Miasto">
              <value>OSTRÓW WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>B.LIMANOWSKIEGO 69</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H. MAJA PLUS  S.C.MAŁGORZTA I JACEK GAŁĄZKA</name>
          <address>62-530 KAZIMIERZ BISKUPI JODŁOWA 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6652572122<br>Kod: 62-530<br>Miasto: KAZIMIERZ BISKUPI<br>Ulica: JODŁOWA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.652572122E9</value>
            </Data>
            <Data name="Kod">
              <value>62-530</value>
            </Data>
            <Data name="Miasto">
              <value>KAZIMIERZ BISKUPI</value>
            </Data>
            <Data name="Ulica">
              <value>JODŁOWA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H. MAJA PLUS  S.C.MAŁGORZTA I JACEK GAŁĄZKA</name>
          <address>62-530 KAZIMIERZ BISKUPI GOLIŃSKA 1A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6652572122<br>Kod: 62-530<br>Miasto: KAZIMIERZ BISKUPI<br>Ulica: GOLIŃSKA 1A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.652572122E9</value>
            </Data>
            <Data name="Kod">
              <value>62-530</value>
            </Data>
            <Data name="Miasto">
              <value>KAZIMIERZ BISKUPI</value>
            </Data>
            <Data name="Ulica">
              <value>GOLIŃSKA 1A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H. MAJA PLUS  S.C.MAŁGORZTA I JACEK GAŁĄZKA</name>
          <address>62-402 OSTROWITE LIPOWA  3 B</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6652572122<br>Kod: 62-402<br>Miasto: OSTROWITE<br>Ulica: LIPOWA  3 B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.652572122E9</value>
            </Data>
            <Data name="Kod">
              <value>62-402</value>
            </Data>
            <Data name="Miasto">
              <value>OSTROWITE</value>
            </Data>
            <Data name="Ulica">
              <value>LIPOWA  3 B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["MAŁGO" MAŁGORZATA WYRWAŁ]]></name>
          <address>62-023 ROBAKOWO OSIEDLE TYGRYSIE 26 A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7791426301<br>Kod: 62-023<br>Miasto: ROBAKOWO<br>Ulica: OSIEDLE TYGRYSIE 26 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.791426301E9</value>
            </Data>
            <Data name="Kod">
              <value>62-023</value>
            </Data>
            <Data name="Miasto">
              <value>ROBAKOWO</value>
            </Data>
            <Data name="Ulica">
              <value>OSIEDLE TYGRYSIE 26 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MARCIN MAŃCZAK SKLEP SPOŻYWCZO-PRZEMYSŁOWY</name>
          <address>64-308 JABŁONNA KOŚCIELNA  31A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6971568309<br>Kod: 64-308<br>Miasto: JABŁONNA<br>Ulica: KOŚCIELNA  31A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.971568309E9</value>
            </Data>
            <Data name="Kod">
              <value>64-308</value>
            </Data>
            <Data name="Miasto">
              <value>JABŁONNA</value>
            </Data>
            <Data name="Ulica">
              <value>KOŚCIELNA  31A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MARCIN MAŃCZAK SKLEP SPOŻYWCZO-PRZEMYSŁOWY</name>
          <address>64-111 LIPNO POWSTAŃCÓW WLKP.5</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6971568309<br>Kod: 64-111<br>Miasto: LIPNO<br>Ulica: POWSTAŃCÓW WLKP.5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.971568309E9</value>
            </Data>
            <Data name="Kod">
              <value>64-111</value>
            </Data>
            <Data name="Miasto">
              <value>LIPNO</value>
            </Data>
            <Data name="Ulica">
              <value>POWSTAŃCÓW WLKP.5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>STACJA PALIW  SKLEP SPOŻYWCZO-PRZEMYSŁOWY URSZULA MARCINIAK</name>
          <address>62-874 BRZEZINY SOBIESĘKI 7</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 9680661968<br>Kod: 62-874<br>Miasto: BRZEZINY<br>Ulica: SOBIESĘKI 7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>9.680661968E9</value>
            </Data>
            <Data name="Kod">
              <value>62-874</value>
            </Data>
            <Data name="Miasto">
              <value>BRZEZINY</value>
            </Data>
            <Data name="Ulica">
              <value>SOBIESĘKI 7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>WYROBY TRADYCYJNE I LOKALNE JOANNA MARCINIEC</name>
          <address>62-586 RZGÓW OSIECZA PIERWSZA 23</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6652916159<br>Kod: 62-586<br>Miasto: RZGÓW<br>Ulica: OSIECZA PIERWSZA 23]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.652916159E9</value>
            </Data>
            <Data name="Kod">
              <value>62-586</value>
            </Data>
            <Data name="Miasto">
              <value>RZGÓW</value>
            </Data>
            <Data name="Ulica">
              <value>OSIECZA PIERWSZA 23</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY IZABELA MATUSZEWSKA</name>
          <address>62-035 KÓRNIK POZNAŃSKA 77</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7851102566<br>Kod: 62-035<br>Miasto: KÓRNIK<br>Ulica: POZNAŃSKA 77]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.851102566E9</value>
            </Data>
            <Data name="Kod">
              <value>62-035</value>
            </Data>
            <Data name="Miasto">
              <value>KÓRNIK</value>
            </Data>
            <Data name="Ulica">
              <value>POZNAŃSKA 77</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["MELBA" SPÓŁKA JAWNADARIUSZ PRZYNOGA, ELŻBIETA PRZYNOGA]]></name>
          <address>62-060 STĘSZEW POZNAŃSKA 19 A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7771026219<br>Kod: 62-060<br>Miasto: STĘSZEW<br>Ulica: POZNAŃSKA 19 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.771026219E9</value>
            </Data>
            <Data name="Kod">
              <value>62-060</value>
            </Data>
            <Data name="Miasto">
              <value>STĘSZEW</value>
            </Data>
            <Data name="Ulica">
              <value>POZNAŃSKA 19 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA MICHAŁOWSKI HENRYK MICHAŁOWSKI SPÓŁKA JAWNA MARKET IRENA</name>
          <address>62-045 PNIEWY PROMIENISTA 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7871803668<br>Kod: 62-045<br>Miasto: PNIEWY<br>Ulica: PROMIENISTA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.871803668E9</value>
            </Data>
            <Data name="Kod">
              <value>62-045</value>
            </Data>
            <Data name="Miasto">
              <value>PNIEWY</value>
            </Data>
            <Data name="Ulica">
              <value>PROMIENISTA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA MICHAŁOWSKI HENRYK MICHAŁOWSKI SPÓŁKA JAWNA MARKET IRENA</name>
          <address>64-410 SIERAKÓW PRZEDSZKOLNA 29</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7871803668<br>Kod: 64-410<br>Miasto: SIERAKÓW<br>Ulica: PRZEDSZKOLNA 29]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.871803668E9</value>
            </Data>
            <Data name="Kod">
              <value>64-410</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAKÓW</value>
            </Data>
            <Data name="Ulica">
              <value>PRZEDSZKOLNA 29</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA MICHAŁOWSKI HENRYK MICHAŁOWSKI SPÓŁKA JAWNA MARKET IRENA</name>
          <address>62-045 PNIEWY STRZELECKA  32</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7871803668<br>Kod: 62-045<br>Miasto: PNIEWY<br>Ulica: STRZELECKA  32]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.871803668E9</value>
            </Data>
            <Data name="Kod">
              <value>62-045</value>
            </Data>
            <Data name="Miasto">
              <value>PNIEWY</value>
            </Data>
            <Data name="Ulica">
              <value>STRZELECKA  32</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU MILKA-1MAŁGORZATA GOŚCINIAK</name>
          <address>62-200 GNIEZNO ROOSEVELTA  116</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7840020770<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: ROOSEVELTA  116]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.84002077E9</value>
            </Data>
            <Data name="Kod">
              <value>62-200</value>
            </Data>
            <Data name="Miasto">
              <value>GNIEZNO</value>
            </Data>
            <Data name="Ulica">
              <value>ROOSEVELTA  116</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MINI MELBA   DARIUSZ PRZYNOGA, MARIANNA PRZYNOGA S.C.</name>
          <address>62-061 BĘDLEWO WIEJSKA 47</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7773220380<br>Kod: 62-061<br>Miasto: BĘDLEWO<br>Ulica: WIEJSKA 47]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.77322038E9</value>
            </Data>
            <Data name="Kod">
              <value>62-061</value>
            </Data>
            <Data name="Miasto">
              <value>BĘDLEWO</value>
            </Data>
            <Data name="Ulica">
              <value>WIEJSKA 47</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MTJ - GROUP MARIA JABCZYŃSKA</name>
          <address>64-100 LESZNO GABRIELA   NARUTOWICZA  74</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6971682181<br>Kod: 64-100<br>Miasto: LESZNO<br>Ulica: GABRIELA   NARUTOWICZA  74]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.971682181E9</value>
            </Data>
            <Data name="Kod">
              <value>64-100</value>
            </Data>
            <Data name="Miasto">
              <value>LESZNO</value>
            </Data>
            <Data name="Ulica">
              <value>GABRIELA   NARUTOWICZA  74</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[MARCZYŃSKI JAROSŁAW "NETTO-MAR" FIRMA HANDLOWA]]></name>
          <address>64-800 CHODZIEŻ BUCZKOWSKA 5</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7641053034<br>Kod: 64-800<br>Miasto: CHODZIEŻ<br>Ulica: BUCZKOWSKA 5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.641053034E9</value>
            </Data>
            <Data name="Kod">
              <value>64-800</value>
            </Data>
            <Data name="Miasto">
              <value>CHODZIEŻ</value>
            </Data>
            <Data name="Ulica">
              <value>BUCZKOWSKA 5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[MARCZYŃSKI JAROSŁAW "NETTO-MAR" FIRMA HANDLOWA]]></name>
          <address>64-850 UJŚCIE WOJSKA POLSKIEGO 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7641053034<br>Kod: 64-850<br>Miasto: UJŚCIE<br>Ulica: WOJSKA POLSKIEGO 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.641053034E9</value>
            </Data>
            <Data name="Kod">
              <value>64-850</value>
            </Data>
            <Data name="Miasto">
              <value>UJŚCIE</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA POLSKIEGO 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZY NOCULAK SPÓŁKA JAWNA</name>
          <address>63-604 BARANÓW RYNEK 14</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6190009880<br>Kod: 63-604<br>Miasto: BARANÓW<br>Ulica: RYNEK 14]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.19000988E9</value>
            </Data>
            <Data name="Kod">
              <value>63-604</value>
            </Data>
            <Data name="Miasto">
              <value>BARANÓW</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 14</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZY  NOCULAK SPÓŁKA JAWNA</name>
          <address>63-600 KĘPNO RYNEK  7</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6190009880<br>Kod: 63-600<br>Miasto: KĘPNO<br>Ulica: RYNEK  7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.19000988E9</value>
            </Data>
            <Data name="Kod">
              <value>63-600</value>
            </Data>
            <Data name="Miasto">
              <value>KĘPNO</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK  7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOZYWCZY  NOCULAK SPÓŁKA JAWNA</name>
          <address>56-500 SYCÓW PLAC WOLNOŚCI  6</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6190009880<br>Kod: 56-500<br>Miasto: SYCÓW<br>Ulica: PLAC WOLNOŚCI  6]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.19000988E9</value>
            </Data>
            <Data name="Kod">
              <value>56-500</value>
            </Data>
            <Data name="Miasto">
              <value>SYCÓW</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC WOLNOŚCI  6</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PIEKARNIA-CUKIERNIA KRZYSZTOF I LESZEK NOWACZYK SPÓŁKA JAWNA</name>
          <address>62-070 DOPIEWO MŁYŃSKA 9</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7771001946<br>Kod: 62-070<br>Miasto: DOPIEWO<br>Ulica: MŁYŃSKA 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.771001946E9</value>
            </Data>
            <Data name="Kod">
              <value>62-070</value>
            </Data>
            <Data name="Miasto">
              <value>DOPIEWO</value>
            </Data>
            <Data name="Ulica">
              <value>MŁYŃSKA 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-WĘDLINIARSKI ZBIGNIEW OLEKSY</name>
          <address>63-300 PLESZEW WOJSKA  POLSKIEGO 28</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6171020018<br>Kod: 63-300<br>Miasto: PLESZEW<br>Ulica: WOJSKA  POLSKIEGO 28]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.171020018E9</value>
            </Data>
            <Data name="Kod">
              <value>63-300</value>
            </Data>
            <Data name="Miasto">
              <value>PLESZEW</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA  POLSKIEGO 28</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY OGÓLNOSPOŻYWCZE EDYTA OSTROWSKA</name>
          <address>61-611 POZNAŃ NARAMOWICKA 232/BOŻYDARA</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 9720869529<br>Kod: 61-611<br>Miasto: POZNAŃ<br>Ulica: NARAMOWICKA 232/BOŻYDARA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>9.720869529E9</value>
            </Data>
            <Data name="Kod">
              <value>61-611</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>NARAMOWICKA 232/BOŻYDARA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWO USŁUGOWE MAREK OSTROWSKI</name>
          <address>61-611 POZNAŃ NARAMOWICKA 170</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 9720421533<br>Kod: 61-611<br>Miasto: POZNAŃ<br>Ulica: NARAMOWICKA 170]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>9.720421533E9</value>
            </Data>
            <Data name="Kod">
              <value>61-611</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>NARAMOWICKA 170</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO USŁUGOWA "PELIKAN" KRZYSZTOFTRZASKAWAKA]]></name>
          <address>88-300 MOGILNO DWORCOWA   7</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7841235165<br>Kod: 88-300<br>Miasto: MOGILNO<br>Ulica: DWORCOWA   7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.841235165E9</value>
            </Data>
            <Data name="Kod">
              <value>88-300</value>
            </Data>
            <Data name="Miasto">
              <value>MOGILNO</value>
            </Data>
            <Data name="Ulica">
              <value>DWORCOWA   7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[KRZYSZTOF TRZASKAWKA F.U.H. "PELIKAN"]]></name>
          <address>88-300 MOGILNO PIŁSUDSKIEGO 23</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7841235165<br>Kod: 88-300<br>Miasto: MOGILNO<br>Ulica: PIŁSUDSKIEGO 23]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.841235165E9</value>
            </Data>
            <Data name="Kod">
              <value>88-300</value>
            </Data>
            <Data name="Miasto">
              <value>MOGILNO</value>
            </Data>
            <Data name="Ulica">
              <value>PIŁSUDSKIEGO 23</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO - USŁUGOWA "PIONIER"PIOTR NOWAK]]></name>
          <address>62-200 GNIEZNO WOLNOŚCI  42 B</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7842032926<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: WOLNOŚCI  42 B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.842032926E9</value>
            </Data>
            <Data name="Kod">
              <value>62-200</value>
            </Data>
            <Data name="Miasto">
              <value>GNIEZNO</value>
            </Data>
            <Data name="Ulica">
              <value>WOLNOŚCI  42 B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA PRUSAK   DARIUSZ PRUSAK</name>
          <address>62-260 ŁUBOWO ŁUBOWO 85</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7841427663<br>Kod: 62-260<br>Miasto: ŁUBOWO<br>Ulica: ŁUBOWO 85]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.841427663E9</value>
            </Data>
            <Data name="Kod">
              <value>62-260</value>
            </Data>
            <Data name="Miasto">
              <value>ŁUBOWO</value>
            </Data>
            <Data name="Ulica">
              <value>ŁUBOWO 85</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[HURTOWA SPÓŁDZIELNIA "SAMOPOMOC CHŁOPSKA"]]></name>
          <address>62-310 PYZDRY WRĄBCZYNEK</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6650001071<br>Kod: 62-310<br>Miasto: PYZDRY<br>Ulica: WRĄBCZYNEK]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.650001071E9</value>
            </Data>
            <Data name="Kod">
              <value>62-310</value>
            </Data>
            <Data name="Miasto">
              <value>PYZDRY</value>
            </Data>
            <Data name="Ulica">
              <value>WRĄBCZYNEK</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO HANDLOWO USŁUGOWE DEL-TRANS KRZYSZTOF SITEK</name>
          <address>64-420 KWILCZ POWSTAŃCÓW WLKP 1B</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 5961000191<br>Kod: 64-420<br>Miasto: KWILCZ<br>Ulica: POWSTAŃCÓW WLKP 1B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.961000191E9</value>
            </Data>
            <Data name="Kod">
              <value>64-420</value>
            </Data>
            <Data name="Miasto">
              <value>KWILCZ</value>
            </Data>
            <Data name="Ulica">
              <value>POWSTAŃCÓW WLKP 1B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ZIELENIAK WIOLETTA SKIBIAK</name>
          <address>64-510 NOWA WIEŚ SZAMOTULSKA 7</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7631257657<br>Kod: 64-510<br>Miasto: NOWA WIEŚ<br>Ulica: SZAMOTULSKA 7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.631257657E9</value>
            </Data>
            <Data name="Kod">
              <value>64-510</value>
            </Data>
            <Data name="Miasto">
              <value>NOWA WIEŚ</value>
            </Data>
            <Data name="Ulica">
              <value>SZAMOTULSKA 7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SŁONECZKO DARIUSZ GULCZYŃSKI</name>
          <address>62-200 GNIEZNO SIENKIEWICZA 13-15</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7841653170<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: SIENKIEWICZA 13-15]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.84165317E9</value>
            </Data>
            <Data name="Kod">
              <value>62-200</value>
            </Data>
            <Data name="Miasto">
              <value>GNIEZNO</value>
            </Data>
            <Data name="Ulica">
              <value>SIENKIEWICZA 13-15</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWA ANNA STACHOWIAK LESZEK STACHOWIAK SPÓŁKA CYWILNA</name>
          <address>62-005 OWIŃSKA PLAC PRZEMYSŁAWA  1C</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7772878120<br>Kod: 62-005<br>Miasto: OWIŃSKA<br>Ulica: PLAC PRZEMYSŁAWA  1C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.77287812E9</value>
            </Data>
            <Data name="Kod">
              <value>62-005</value>
            </Data>
            <Data name="Miasto">
              <value>OWIŃSKA</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC PRZEMYSŁAWA  1C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.W.  HAWA   GRAŻYNA STACHOWIAK</name>
          <address>64-600 OBORNIKI DROGA LEŚNA  25</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7871007061<br>Kod: 64-600<br>Miasto: OBORNIKI<br>Ulica: DROGA LEŚNA  25]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.871007061E9</value>
            </Data>
            <Data name="Kod">
              <value>64-600</value>
            </Data>
            <Data name="Miasto">
              <value>OBORNIKI</value>
            </Data>
            <Data name="Ulica">
              <value>DROGA LEŚNA  25</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO-USŁUGOWA KATARZYNA STROIWĄS-OCHOWIAK</name>
          <address>62-023 BORÓWIEC POZNAŃSKA 34</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7851435196<br>Kod: 62-023<br>Miasto: BORÓWIEC<br>Ulica: POZNAŃSKA 34]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.851435196E9</value>
            </Data>
            <Data name="Kod">
              <value>62-023</value>
            </Data>
            <Data name="Miasto">
              <value>BORÓWIEC</value>
            </Data>
            <Data name="Ulica">
              <value>POZNAŃSKA 34</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-PRZEMYSŁOWY ANDRZEJ SZAŁA</name>
          <address>62-066 GRANOWO OGRODOWA 1A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7880010737<br>Kod: 62-066<br>Miasto: GRANOWO<br>Ulica: OGRODOWA 1A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.880010737E9</value>
            </Data>
            <Data name="Kod">
              <value>62-066</value>
            </Data>
            <Data name="Miasto">
              <value>GRANOWO</value>
            </Data>
            <Data name="Ulica">
              <value>OGRODOWA 1A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO - USŁUGOWA  SZPAK  MARIUSZ PARADOWSKI</name>
          <address>64-410 SIERAKÓW WIELEŃSKA 51</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 5951341424<br>Kod: 64-410<br>Miasto: SIERAKÓW<br>Ulica: WIELEŃSKA 51]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.951341424E9</value>
            </Data>
            <Data name="Kod">
              <value>64-410</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAKÓW</value>
            </Data>
            <Data name="Ulica">
              <value>WIELEŃSKA 51</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO PRODUKCYJNO-HANDLOWE IRENA SZUDA</name>
          <address>60-658 POZNAŃ BONIN 8</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7790044767<br>Kod: 60-658<br>Miasto: POZNAŃ<br>Ulica: BONIN 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.790044767E9</value>
            </Data>
            <Data name="Kod">
              <value>60-658</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>BONIN 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KAROL SZUDA PRZEDSIĘBIORSTWO HANDLOWE</name>
          <address>60-462 POZNAŃ BŁĘKITNA 1/7</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7772705052<br>Kod: 60-462<br>Miasto: POZNAŃ<br>Ulica: BŁĘKITNA 1/7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.772705052E9</value>
            </Data>
            <Data name="Kod">
              <value>60-462</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>BŁĘKITNA 1/7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PH ADAM SZUDA KAROL SZUDASPÓŁKA CYWILNA</name>
          <address>60-462 POZNAŃ SZARYCH SZEREGÓW 12</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7811912307<br>Kod: 60-462<br>Miasto: POZNAŃ<br>Ulica: SZARYCH SZEREGÓW 12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.811912307E9</value>
            </Data>
            <Data name="Kod">
              <value>60-462</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>SZARYCH SZEREGÓW 12</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO WIELOBRANŻOWE ANITA ŚMIGIELSKA</name>
          <address>64-520 OBRZYCKO RYNEK 2</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7871068387<br>Kod: 64-520<br>Miasto: OBRZYCKO<br>Ulica: RYNEK 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.871068387E9</value>
            </Data>
            <Data name="Kod">
              <value>64-520</value>
            </Data>
            <Data name="Miasto">
              <value>OBRZYCKO</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>TAD-MARKET MICHAŁ CIESIÓŁKA</name>
          <address>61-294 POZNAŃ OS. LECHA 43</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7631841215<br>Kod: 61-294<br>Miasto: POZNAŃ<br>Ulica: OS. LECHA 43]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.631841215E9</value>
            </Data>
            <Data name="Kod">
              <value>61-294</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>OS. LECHA 43</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["TALAREK"  TOMASZ STEPHAN]]></name>
          <address>62-200 GNIEZNO GRZYBOWO  17</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7841656903<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: GRZYBOWO  17]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.841656903E9</value>
            </Data>
            <Data name="Kod">
              <value>62-200</value>
            </Data>
            <Data name="Miasto">
              <value>GNIEZNO</value>
            </Data>
            <Data name="Ulica">
              <value>GRZYBOWO  17</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["TALAREK"  TOMASZ STEPHAN]]></name>
          <address>62-200 GNIEZNO OS ŁĄKOWE 55 WĘŁNICA</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7841656903<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: OS ŁĄKOWE 55 WĘŁNICA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.841656903E9</value>
            </Data>
            <Data name="Kod">
              <value>62-200</value>
            </Data>
            <Data name="Miasto">
              <value>GNIEZNO</value>
            </Data>
            <Data name="Ulica">
              <value>OS ŁĄKOWE 55 WĘŁNICA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["TALAREK"  TOMASZ STEPHAN]]></name>
          <address>62-200 GNIEZNO SIKORSIEGO 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7841656903<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: SIKORSIEGO 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.841656903E9</value>
            </Data>
            <Data name="Kod">
              <value>62-200</value>
            </Data>
            <Data name="Miasto">
              <value>GNIEZNO</value>
            </Data>
            <Data name="Ulica">
              <value>SIKORSIEGO 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>TIM SPÓŁKA CYWILNA  PRZEMYSŁAW  KAŻMIERCZAKKATARZYNA KAŹMIERCZAK</name>
          <address>60-158 POZNAŃ JANA KEPLERA  1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7792347822<br>Kod: 60-158<br>Miasto: POZNAŃ<br>Ulica: JANA KEPLERA  1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.792347822E9</value>
            </Data>
            <Data name="Kod">
              <value>60-158</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>JANA KEPLERA  1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-PRZEMYSŁOWY BEATA TOMCZAK</name>
          <address>63-130 KSIĄŻ WILEKOPOLSKI CHRZĄSTKOWO 46</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7851203793<br>Kod: 63-130<br>Miasto: KSIĄŻ WILEKOPOLSKI<br>Ulica: CHRZĄSTKOWO 46]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.851203793E9</value>
            </Data>
            <Data name="Kod">
              <value>63-130</value>
            </Data>
            <Data name="Miasto">
              <value>KSIĄŻ WILEKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>CHRZĄSTKOWO 46</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY CHATKA GRZEGORZ TOMCZAK</name>
          <address>63-004 TULCE GOWARZEWO, RABOWICKA 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7822115307<br>Kod: 63-004<br>Miasto: TULCE<br>Ulica: GOWARZEWO, RABOWICKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822115307E9</value>
            </Data>
            <Data name="Kod">
              <value>63-004</value>
            </Data>
            <Data name="Miasto">
              <value>TULCE</value>
            </Data>
            <Data name="Ulica">
              <value>GOWARZEWO, RABOWICKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY CHATKA GRZEGORZ TOMCZAK</name>
          <address>63-004 TULCE GOWARZEWO, SIEKIERECKA 24B/1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7822115307<br>Kod: 63-004<br>Miasto: TULCE<br>Ulica: GOWARZEWO, SIEKIERECKA 24B/1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822115307E9</value>
            </Data>
            <Data name="Kod">
              <value>63-004</value>
            </Data>
            <Data name="Miasto">
              <value>TULCE</value>
            </Data>
            <Data name="Ulica">
              <value>GOWARZEWO, SIEKIERECKA 24B/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWA "TOMI"TOMASZ ZIELIŃSKI]]></name>
          <address>64-500 SZAMOTUŁY ZIELONA 72</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7870005404<br>Kod: 64-500<br>Miasto: SZAMOTUŁY<br>Ulica: ZIELONA 72]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870005404E9</value>
            </Data>
            <Data name="Kod">
              <value>64-500</value>
            </Data>
            <Data name="Miasto">
              <value>SZAMOTUŁY</value>
            </Data>
            <Data name="Ulica">
              <value>ZIELONA 72</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>TORO ROGER TROSZYŃSKIBARBARA TROSZYŃSKA  SPÓŁKA CYWILNA</name>
          <address>63-020 ZANIEMYŚL RACZYŃSKIEGO 3</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7861700932<br>Kod: 63-020<br>Miasto: ZANIEMYŚL<br>Ulica: RACZYŃSKIEGO 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.861700932E9</value>
            </Data>
            <Data name="Kod">
              <value>63-020</value>
            </Data>
            <Data name="Miasto">
              <value>ZANIEMYŚL</value>
            </Data>
            <Data name="Ulica">
              <value>RACZYŃSKIEGO 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>TRANS MARKSPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</name>
          <address>61-329 POZNAŃ GŁUSZYNA 273</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7811665843<br>Kod: 61-329<br>Miasto: POZNAŃ<br>Ulica: GŁUSZYNA 273]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.811665843E9</value>
            </Data>
            <Data name="Kod">
              <value>61-329</value>
            </Data>
            <Data name="Miasto">
              <value>POZNAŃ</value>
            </Data>
            <Data name="Ulica">
              <value>GŁUSZYNA 273</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPOŻYWCZO-PRZEMYSŁOWY " U DOROTY" DOROTAGORCZYŃSKA-AST]]></name>
          <address>64-600 OBORNIKI STANISŁAWA STASZICA 9</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7871162270<br>Kod: 64-600<br>Miasto: OBORNIKI<br>Ulica: STANISŁAWA STASZICA 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.87116227E9</value>
            </Data>
            <Data name="Kod">
              <value>64-600</value>
            </Data>
            <Data name="Miasto">
              <value>OBORNIKI</value>
            </Data>
            <Data name="Ulica">
              <value>STANISŁAWA STASZICA 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZY  U  LUSIJOANNA  NOWAKOWSKA-LUSSA</name>
          <address>63-000 BRODOWO POZNAŃSKA  10</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7861682944<br>Kod: 63-000<br>Miasto: BRODOWO<br>Ulica: POZNAŃSKA  10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.861682944E9</value>
            </Data>
            <Data name="Kod">
              <value>63-000</value>
            </Data>
            <Data name="Miasto">
              <value>BRODOWO</value>
            </Data>
            <Data name="Ulica">
              <value>POZNAŃSKA  10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY MATEUSZ URBAŃSKI</name>
          <address>98-400 WIERUSZÓW KLEMENSA WIERUSZA 5</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 9970135751<br>Kod: 98-400<br>Miasto: WIERUSZÓW<br>Ulica: KLEMENSA WIERUSZA 5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>9.970135751E9</value>
            </Data>
            <Data name="Kod">
              <value>98-400</value>
            </Data>
            <Data name="Miasto">
              <value>WIERUSZÓW</value>
            </Data>
            <Data name="Ulica">
              <value>KLEMENSA WIERUSZA 5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["WALDI" ZAWIDZKI SPÓŁKA JAWNAMARKET  SUŁKOWSKI]]></name>
          <address>64-100 LESZNO SUŁKOWSKIEGO 46</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6971002795<br>Kod: 64-100<br>Miasto: LESZNO<br>Ulica: SUŁKOWSKIEGO 46]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.971002795E9</value>
            </Data>
            <Data name="Kod">
              <value>64-100</value>
            </Data>
            <Data name="Miasto">
              <value>LESZNO</value>
            </Data>
            <Data name="Ulica">
              <value>SUŁKOWSKIEGO 46</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>JERZY WAWRZYNIAK</name>
          <address>63-400 OSTRÓW WIELKOPOLSKI INŻYNIERSKA 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 8511053237<br>Kod: 63-400<br>Miasto: OSTRÓW WIELKOPOLSKI<br>Ulica: INŻYNIERSKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>8.511053237E9</value>
            </Data>
            <Data name="Kod">
              <value>63-400</value>
            </Data>
            <Data name="Miasto">
              <value>OSTRÓW WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>INŻYNIERSKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO WIELOBRANŻOWE "WEGA" JAROSŁAW ZIMNY]]></name>
          <address>64-300 NOWY  TOMYŚL OS. ST.BATOREGO  20</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7880005713<br>Kod: 64-300<br>Miasto: NOWY  TOMYŚL<br>Ulica: OS. ST.BATOREGO  20]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.880005713E9</value>
            </Data>
            <Data name="Kod">
              <value>64-300</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY  TOMYŚL</value>
            </Data>
            <Data name="Ulica">
              <value>OS. ST.BATOREGO  20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO WIELOBRANŻOWE "WEGA" JAROSŁAW ZIMNY]]></name>
          <address>64-320 SZEWCE BUKOWSKA 111</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7880005713<br>Kod: 64-320<br>Miasto: SZEWCE<br>Ulica: BUKOWSKA 111]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.880005713E9</value>
            </Data>
            <Data name="Kod">
              <value>64-320</value>
            </Data>
            <Data name="Miasto">
              <value>SZEWCE</value>
            </Data>
            <Data name="Ulica">
              <value>BUKOWSKA 111</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>WIOLETTA WOJTCZAK SKLEP SPOŻYWCZO PRZEMYSŁOWY</name>
          <address>62-610 SOMPOLNO LUBSTÓWEK NR 57</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6652558719<br>Kod: 62-610<br>Miasto: SOMPOLNO<br>Ulica: LUBSTÓWEK NR 57]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.652558719E9</value>
            </Data>
            <Data name="Kod">
              <value>62-610</value>
            </Data>
            <Data name="Miasto">
              <value>SOMPOLNO</value>
            </Data>
            <Data name="Ulica">
              <value>LUBSTÓWEK NR 57</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY SPÓŁKA CYWILNA MAGDALENA WOJTYŚ, MAŁGORZATA BŁASZCZYK</name>
          <address>62-322 ORZECHOWO SZKOLNA 3 CZESZEWO</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7891538726<br>Kod: 62-322<br>Miasto: ORZECHOWO<br>Ulica: SZKOLNA 3 CZESZEWO]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.891538726E9</value>
            </Data>
            <Data name="Kod">
              <value>62-322</value>
            </Data>
            <Data name="Miasto">
              <value>ORZECHOWO</value>
            </Data>
            <Data name="Ulica">
              <value>SZKOLNA 3 CZESZEWO</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPOKOJNA -PARK WRÓBLEWSCYSPÓŁKA JAWNA</name>
          <address>63-900 RAWICZ SCZANIECKICH 1</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6991900132<br>Kod: 63-900<br>Miasto: RAWICZ<br>Ulica: SCZANIECKICH 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.991900132E9</value>
            </Data>
            <Data name="Kod">
              <value>63-900</value>
            </Data>
            <Data name="Miasto">
              <value>RAWICZ</value>
            </Data>
            <Data name="Ulica">
              <value>SCZANIECKICH 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWA JEDYNKA KATARZYNA ZEMLIK</name>
          <address>64-610 ROGOŹNO ZA JEZIOREM 2A</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6060000461<br>Kod: 64-610<br>Miasto: ROGOŹNO<br>Ulica: ZA JEZIOREM 2A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.060000461E9</value>
            </Data>
            <Data name="Kod">
              <value>64-610</value>
            </Data>
            <Data name="Miasto">
              <value>ROGOŹNO</value>
            </Data>
            <Data name="Ulica">
              <value>ZA JEZIOREM 2A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU MIKOŁAJ MIKOŁAJ ŻAK SKLEP PRUSINOWO</name>
          <address>62-035 KÓRNIK PRUSINOWO 6</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7851185434<br>Kod: 62-035<br>Miasto: KÓRNIK<br>Ulica: PRUSINOWO 6]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.851185434E9</value>
            </Data>
            <Data name="Kod">
              <value>62-035</value>
            </Data>
            <Data name="Miasto">
              <value>KÓRNIK</value>
            </Data>
            <Data name="Ulica">
              <value>PRUSINOWO 6</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FRIMA HANDOLOWO - USŁUGOWAANMAR</name>
          <address>74-400 DĘBNO OBORZANY</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 5971443731<br>Kod: 74-400<br>Miasto: DĘBNO<br>Ulica: OBORZANY]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.971443731E9</value>
            </Data>
            <Data name="Kod">
              <value>74-400</value>
            </Data>
            <Data name="Miasto">
              <value>DĘBNO</value>
            </Data>
            <Data name="Ulica">
              <value>OBORZANY</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>BABA-JAGA  KATARZYNA ORACZ</name>
          <address>74-106 KOŁBACZ SZARYCH MNICHÓW 11</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 9551357435<br>Kod: 74-106<br>Miasto: KOŁBACZ<br>Ulica: SZARYCH MNICHÓW 11]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>9.551357435E9</value>
            </Data>
            <Data name="Kod">
              <value>74-106</value>
            </Data>
            <Data name="Miasto">
              <value>KOŁBACZ</value>
            </Data>
            <Data name="Ulica">
              <value>SZARYCH MNICHÓW 11</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO - PRZEMYSŁOWY SPÓŁKA CYWILNA MARIAN BLATKIEWICZ, ALEKSANDRA JASICZAK</name>
          <address>66-433 LUBISZYN GORZOWSKA  3 A</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 5991416915<br>Kod: 66-433<br>Miasto: LUBISZYN<br>Ulica: GORZOWSKA  3 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.991416915E9</value>
            </Data>
            <Data name="Kod">
              <value>66-433</value>
            </Data>
            <Data name="Miasto">
              <value>LUBISZYN</value>
            </Data>
            <Data name="Ulica">
              <value>GORZOWSKA  3 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ADAM BORCZYŃSKI</name>
          <address>66-432 BACZYNA GORZOWSKA 36</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 5991043408<br>Kod: 66-432<br>Miasto: BACZYNA<br>Ulica: GORZOWSKA 36]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.991043408E9</value>
            </Data>
            <Data name="Kod">
              <value>66-432</value>
            </Data>
            <Data name="Miasto">
              <value>BACZYNA</value>
            </Data>
            <Data name="Ulica">
              <value>GORZOWSKA 36</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL ARTYKUŁAMI SPOŻYWCZO-PRZEMYSŁOWYMI ŻANETA NOWOROLNIK</name>
          <address>74-520 CEDYNIA PUŁASKIEGO</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 8581036209<br>Kod: 74-520<br>Miasto: CEDYNIA<br>Ulica: PUŁASKIEGO]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.581036209E9</value>
            </Data>
            <Data name="Kod">
              <value>74-520</value>
            </Data>
            <Data name="Miasto">
              <value>CEDYNIA</value>
            </Data>
            <Data name="Ulica">
              <value>PUŁASKIEGO</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["DELIKATESY" MAŁGORZATA CZERNIKIEWICZ]]></name>
          <address>78-550 CZAPLINEK WAŁECKA 56</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 6741228886<br>Kod: 78-550<br>Miasto: CZAPLINEK<br>Ulica: WAŁECKA 56]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>6.741228886E9</value>
            </Data>
            <Data name="Kod">
              <value>78-550</value>
            </Data>
            <Data name="Miasto">
              <value>CZAPLINEK</value>
            </Data>
            <Data name="Ulica">
              <value>WAŁECKA 56</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSIĘBIORSTWO PRODUKCYJNO HANDLOWO USŁUGOWE DALMAR MARCIN DALECKI</name>
          <address>78-600 WAŁCZ POGODNA 29 JEZIORKI</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 7651264554<br>Kod: 78-600<br>Miasto: WAŁCZ<br>Ulica: POGODNA 29 JEZIORKI]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>7.651264554E9</value>
            </Data>
            <Data name="Kod">
              <value>78-600</value>
            </Data>
            <Data name="Miasto">
              <value>WAŁCZ</value>
            </Data>
            <Data name="Ulica">
              <value>POGODNA 29 JEZIORKI</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FENIKS RADOSŁAW DYMECKI</name>
          <address>66-400 GORZÓW  WIELKOPOLSKI KOMBATANTÓW 2</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 5992331983<br>Kod: 66-400<br>Miasto: GORZÓW  WIELKOPOLSKI<br>Ulica: KOMBATANTÓW 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.992331983E9</value>
            </Data>
            <Data name="Kod">
              <value>66-400</value>
            </Data>
            <Data name="Miasto">
              <value>GORZÓW  WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>KOMBATANTÓW 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FENIKS  RADOSŁAW DYMECKI</name>
          <address>66-400 GORZÓW WIELKOPOLSKI PAPUSZY  5 A</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 5992331983<br>Kod: 66-400<br>Miasto: GORZÓW WIELKOPOLSKI<br>Ulica: PAPUSZY  5 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.992331983E9</value>
            </Data>
            <Data name="Kod">
              <value>66-400</value>
            </Data>
            <Data name="Miasto">
              <value>GORZÓW WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>PAPUSZY  5 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GROSIK SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ SKLEP  JOKER 102</name>
          <address>63-300 MIĘDZYRZECZ GŁOWACKIEGO  1</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 9271929391<br>Kod: 63-300<br>Miasto: MIĘDZYRZECZ<br>Ulica: GŁOWACKIEGO  1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271929391E9</value>
            </Data>
            <Data name="Kod">
              <value>63-300</value>
            </Data>
            <Data name="Miasto">
              <value>MIĘDZYRZECZ</value>
            </Data>
            <Data name="Ulica">
              <value>GŁOWACKIEGO  1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GROSIK SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ SKLEP GROSIK 3</name>
          <address>66-300 BOBOWICKO/MIĘDZYRZECZ MIĘDZYRZECKA 1</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 9271929391<br>Kod: 66-300<br>Miasto: BOBOWICKO/MIĘDZYRZECZ<br>Ulica: MIĘDZYRZECKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271929391E9</value>
            </Data>
            <Data name="Kod">
              <value>66-300</value>
            </Data>
            <Data name="Miasto">
              <value>BOBOWICKO/MIĘDZYRZECZ</value>
            </Data>
            <Data name="Ulica">
              <value>MIĘDZYRZECKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOZYWCZO PRZEMYSŁOWY PRZEMYSŁAW JAWORSKI</name>
          <address>66-436 SŁOŃSK SIKORSKIEGO 42</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 4290023312<br>Kod: 66-436<br>Miasto: SŁOŃSK<br>Ulica: SIKORSKIEGO 42]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>4.290023312E9</value>
            </Data>
            <Data name="Kod">
              <value>66-436</value>
            </Data>
            <Data name="Miasto">
              <value>SŁOŃSK</value>
            </Data>
            <Data name="Ulica">
              <value>SIKORSKIEGO 42</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MONIKA KOBUSIAK SKLEP SPOZYWCZO - PRZEMYSŁOWY</name>
          <address>74-510 TRZCIŃSKO ZDRÓJ KRÓTKA  11</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 8581573976<br>Kod: 74-510<br>Miasto: TRZCIŃSKO ZDRÓJ<br>Ulica: KRÓTKA  11]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.581573976E9</value>
            </Data>
            <Data name="Kod">
              <value>74-510</value>
            </Data>
            <Data name="Miasto">
              <value>TRZCIŃSKO ZDRÓJ</value>
            </Data>
            <Data name="Ulica">
              <value>KRÓTKA  11</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[HANDEL ART. SPOŻYWCZYMI I PRZEMYSŁOWYMISKLEP "DELIKATESY" HURT I DETAL ELŻBIETA KUJAWA]]></name>
          <address>72-400 KAMIEŃ POMORSKI BAŁTYCKA 1C</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 8610001031<br>Kod: 72-400<br>Miasto: KAMIEŃ POMORSKI<br>Ulica: BAŁTYCKA 1C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.610001031E9</value>
            </Data>
            <Data name="Kod">
              <value>72-400</value>
            </Data>
            <Data name="Miasto">
              <value>KAMIEŃ POMORSKI</value>
            </Data>
            <Data name="Ulica">
              <value>BAŁTYCKA 1C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU MdM UDZIELA,UDZIELA SPÓŁKA JAWNA</name>
          <address>69-110 RZEPIN RADOWSKA 27 KOWALÓW</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 5981597683<br>Kod: 69-110<br>Miasto: RZEPIN<br>Ulica: RADOWSKA 27 KOWALÓW]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.981597683E9</value>
            </Data>
            <Data name="Kod">
              <value>69-110</value>
            </Data>
            <Data name="Miasto">
              <value>RZEPIN</value>
            </Data>
            <Data name="Ulica">
              <value>RADOWSKA 27 KOWALÓW</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>M.K.M. SPÓŁKA CYWILNA MAGDALENA MIGA, MAŁGORZATA MIGA</name>
          <address>78-449 BORNE SULINOWO SOSNOWA 5/3</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 6731660197<br>Kod: 78-449<br>Miasto: BORNE SULINOWO<br>Ulica: SOSNOWA 5/3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>6.731660197E9</value>
            </Data>
            <Data name="Kod">
              <value>78-449</value>
            </Data>
            <Data name="Miasto">
              <value>BORNE SULINOWO</value>
            </Data>
            <Data name="Ulica">
              <value>SOSNOWA 5/3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL DETALICZNY ARTYKUŁAMI SPOŻYWCZO-PRZEMYSŁOWYMI SPÓŁKA JAWNA ZDZISŁAW WERAKSA, ANETA KIEŁBASA</name>
          <address>74-400 DĘBNO LUBUSKIE CHOJEŃSKA 8</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 5971334315<br>Kod: 74-400<br>Miasto: DĘBNO LUBUSKIE<br>Ulica: CHOJEŃSKA 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.971334315E9</value>
            </Data>
            <Data name="Kod">
              <value>74-400</value>
            </Data>
            <Data name="Miasto">
              <value>DĘBNO LUBUSKIE</value>
            </Data>
            <Data name="Ulica">
              <value>CHOJEŃSKA 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO - PRZEMYSŁOWY PIECIUL KRYSTYNA</name>
          <address>74-300 MYŚLIBÓRZ RATUSZOWA 10</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 5971332173<br>Kod: 74-300<br>Miasto: MYŚLIBÓRZ<br>Ulica: RATUSZOWA 10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.971332173E9</value>
            </Data>
            <Data name="Kod">
              <value>74-300</value>
            </Data>
            <Data name="Miasto">
              <value>MYŚLIBÓRZ</value>
            </Data>
            <Data name="Ulica">
              <value>RATUSZOWA 10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP CHATA POLSKA TERESA PIOTROWSKA</name>
          <address>66-400 GORZÓW WIELKOPOLSKI POZNAŃSKA 101</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 5991217794<br>Kod: 66-400<br>Miasto: GORZÓW WIELKOPOLSKI<br>Ulica: POZNAŃSKA 101]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.991217794E9</value>
            </Data>
            <Data name="Kod">
              <value>66-400</value>
            </Data>
            <Data name="Miasto">
              <value>GORZÓW WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>POZNAŃSKA 101</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPHU " U KACHNY " KATARZYNA BIL]]></name>
          <address>66-320 TRZCIEL SIERCZ 38</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 5961126868<br>Kod: 66-320<br>Miasto: TRZCIEL<br>Ulica: SIERCZ 38]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.961126868E9</value>
            </Data>
            <Data name="Kod">
              <value>66-320</value>
            </Data>
            <Data name="Miasto">
              <value>TRZCIEL</value>
            </Data>
            <Data name="Ulica">
              <value>SIERCZ 38</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>F.H.U. LEGRA  GRAŻYNA  ZAREMBA</name>
          <address>72-420 DZIWNÓW OSIEDLE RYBACKIE  113A</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 8571238791<br>Kod: 72-420<br>Miasto: DZIWNÓW<br>Ulica: OSIEDLE RYBACKIE  113A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.571238791E9</value>
            </Data>
            <Data name="Kod">
              <value>72-420</value>
            </Data>
            <Data name="Miasto">
              <value>DZIWNÓW</value>
            </Data>
            <Data name="Ulica">
              <value>OSIEDLE RYBACKIE  113A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ANNA ŻEMOJTEL</name>
          <address>72-514 KOŁCZEWO LEŚNA 4  WISEŁKA</address>
          <description><![CDATA[Województwo: zachodniopomorskie<br>NIP: 8550002706<br>Kod: 72-514<br>Miasto: KOŁCZEWO<br>Ulica: LEŚNA 4  WISEŁKA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.550002706E9</value>
            </Data>
            <Data name="Kod">
              <value>72-514</value>
            </Data>
            <Data name="Miasto">
              <value>KOŁCZEWO</value>
            </Data>
            <Data name="Ulica">
              <value>LEŚNA 4  WISEŁKA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAWA SAWICKI I SPÓŁKA SP.J.SKLEP RZĄDZIK 2</name>
          <address>86-300 GRUDZIĄDZ SOBIESKIEGO 5</address>
          <description><![CDATA[Województwo: kujawsko-pomorskie<br>NIP: 8762467404<br>Kod: 86-300<br>Miasto: GRUDZIĄDZ<br>Ulica: SOBIESKIEGO 5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.762467404E9</value>
            </Data>
            <Data name="Kod">
              <value>86-300</value>
            </Data>
            <Data name="Miasto">
              <value>GRUDZIĄDZ</value>
            </Data>
            <Data name="Ulica">
              <value>SOBIESKIEGO 5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRANŻOWY ROMAN DYTKO I BOGUSŁAW DYTKO SPÓŁKA JAWNA MARKET</name>
          <address>67-120 KOŻUCHÓW 22 -LIPCA 1807/1</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9250012374<br>Kod: 67-120<br>Miasto: KOŻUCHÓW<br>Ulica: 22 -LIPCA 1807/1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>67-120</value>
            </Data>
            <Data name="Miasto">
              <value>KOŻUCHÓW</value>
            </Data>
            <Data name="Ulica">
              <value>22 -LIPCA 1807/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOŻYWCZO-PRZEMYSŁOWY MAŁA GASTRONOMIAANNA RYMARZ</name>
          <address>67-320 MAŁOMICE LUBIECHÓW 93/1</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9241493003<br>Kod: 67-320<br>Miasto: MAŁOMICE<br>Ulica: LUBIECHÓW 93/1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241493003E9</value>
            </Data>
            <Data name="Kod">
              <value>67-320</value>
            </Data>
            <Data name="Miasto">
              <value>MAŁOMICE</value>
            </Data>
            <Data name="Ulica">
              <value>LUBIECHÓW 93/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KAMILA WŁODARCZAK SKLEP SPOŻYWCZY</name>
          <address>67-312 NIEGOSŁAWICE PRZECŁAW 302/3</address>
          <description><![CDATA[Województwo: lubuskie<br>NIP: 9251965685<br>Kod: 67-312<br>Miasto: NIEGOSŁAWICE<br>Ulica: PRZECŁAW 302/3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.251965685E9</value>
            </Data>
            <Data name="Kod">
              <value>67-312</value>
            </Data>
            <Data name="Miasto">
              <value>NIEGOSŁAWICE</value>
            </Data>
            <Data name="Ulica">
              <value>PRZECŁAW 302/3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DZIEWIĘCKI MIROSŁAW SKLEP SPOŻYWCZO- PRZEMYSŁOWY</name>
          <address>63-505 DORUCHÓW PRZYTOCZNICA LOK 20</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 5140108763<br>Kod: 63-505<br>Miasto: DORUCHÓW<br>Ulica: PRZYTOCZNICA LOK 20]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.140108763E9</value>
            </Data>
            <Data name="Kod">
              <value>63-505</value>
            </Data>
            <Data name="Miasto">
              <value>DORUCHÓW</value>
            </Data>
            <Data name="Ulica">
              <value>PRZYTOCZNICA LOK 20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SPÓLDZIELNIA"SAMOPOMOC CHŁOPSKA"]]></name>
          <address>62-400 SIERAKÓW GÓRA 45</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7870000223<br>Kod: 62-400<br>Miasto: SIERAKÓW<br>Ulica: GÓRA 45]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870000223E9</value>
            </Data>
            <Data name="Kod">
              <value>62-400</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAKÓW</value>
            </Data>
            <Data name="Ulica">
              <value>GÓRA 45</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSIĘBIORSTWO PRODUKCYJNO HANDLOWE "KASZTELAN" SPOŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ]]></name>
          <address>62-700 WŁADYSŁAWÓW CHYLIN W LOKALU 86C</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 6681934177<br>Kod: 62-700<br>Miasto: WŁADYSŁAWÓW<br>Ulica: CHYLIN W LOKALU 86C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.681934177E9</value>
            </Data>
            <Data name="Kod">
              <value>62-700</value>
            </Data>
            <Data name="Miasto">
              <value>WŁADYSŁAWÓW</value>
            </Data>
            <Data name="Ulica">
              <value>CHYLIN W LOKALU 86C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OGÓLNOSPOŻYWCZY EWA KUJAWA-MISCH</name>
          <address>64-300 NOWY TOMYŚL 3 STYCZNIA 6</address>
          <description><![CDATA[Województwo: wielkopolskie<br>NIP: 7881687011<br>Kod: 64-300<br>Miasto: NOWY TOMYŚL<br>Ulica: 3 STYCZNIA 6]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Województwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.881687011E9</value>
            </Data>
            <Data name="Kod">
              <value>64-300</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY TOMYŚL</value>
            </Data>
            <Data name="Ulica">
              <value>3 STYCZNIA 6</value>
            </Data>
          </ExtendedData>
        </Placemark>
      </Document>
    </kml>
    `;
    const kmlDoc = convertKml(kml);
    var zalup = [];

    let index = 0;
    kmlDoc.Document.Placemark.forEach((folder) => {
      index++;
      zalup.push({
        NIP: folder.ExtendedData.Data[1].value,
        address: folder.address,
        name: folder.name,
      });
      console.log(folder.address);
      console.log(folder.ExtendedData.Data[1].value);
      //   setTimeout(() => {
      //     var localhuita = await provider.search({
      //       query: val,
      //     });
      //   }, 1100);

      folder.Placemark?.forEach((place) => {
        console.log(place.name, place.Point);
      });
    });
    res.json(zalup);
    // const {
    //   parse,
    //   parseFolder,
    //   parseGeoJSON,
    //   parseDescription,
    // } = require("kml-utils");
    // const fs = require("fs-extra");
    // const DOMParser = require("xmldom").DOMParser;
    // const kmlDom = new DOMParser().parseFromString(
    //   fs.readFileSync(files["file_kml"].path, "utf8")
    // );
    // const abc = parse(kmlDom, {
    //   // parse style
    //   style: false,
    //   // parse elements to folder tree
    //   folderElements: ["Document", "Folder", "Placemark", "name"],
    //   propertyCallbacks: {
    //     name(data) {
    //       // return a value to replace the property's value
    //       return "123";
    //       // return an object to replace the property
    //       // return { newName:123 }
    //       // parse html-type-description
    //       //   return parseDescription(data);
    //     },
    //   },
    // });
    // const buffer = fs.readFileSync(files["file_kml"].path);
    // const kmlDocument = new KmlDocument(buffer);
    // res.json({ kmlDocument });
    //   console.log(files["file_kml"].path);
    // var tj = require("togeojson"),
    //   DOMParser = require("xmldom").DOMParser;
    // var kml = new DOMParser().parseFromString(
    //   fs.readFileSync(files["file_kml"].path, "utf8")
    // );
    // const parseKML = require("parse-kml");
    // const gac = await parseKML.toJson(files["file_kml"].path);
    // res.json(gac);
    // var converted = tj.kml(kml);
    // // console.log(
    // //   "🚀 ~ file: uploadKML.js ~ line 32 ~ form.parse ~ converted",
    // //   converted
    // // );
    // var convertedWithStyles = tj.kml(kml, { styles: true });
    // console.log(convertedWithStyles);
    // //   console.log(convertedWithStyles, "suka");
    // //   console.log(convertedWithStyles.features[3]);
    // var newArr = [];
    // converted.features.forEach((element) => {
    //   newArr.push(element);
    //   console.log(1);
    // });
    // console.log(newArr);
    // res.json(newArr);
    //   console.log(converted.features[0].geometry);
  });

  //   } catch (error) {
  //     res.json({ payload: error, otbv: 1 });
  //   }
});

export { router as uploadKML };
