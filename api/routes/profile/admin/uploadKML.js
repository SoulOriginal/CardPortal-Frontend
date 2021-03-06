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
          <name>MARKET ABC BO??ENA PIEKARZ, W??ADYS??AW PIEKARZ SP????KA JAWNA</name>
          <address>59-300 LUBIN JASTRZ??BIA  6</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6920209894<br>Kod: 59-300<br>Miasto: LUBIN<br>Ulica: JASTRZ??BIA  6]]></description>
          <styleUrl>#icon-1899-DB4436</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
              <value>JASTRZ??BIA  6</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MARKET ABC BO??ENA PIEKARZ, W??ADYS??AW PIEKARZSP????KA JAWNA</name>
          <address>59-230 PROCHOWICE WROC??AWSKA  18</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6920209894<br>Kod: 59-230<br>Miasto: PROCHOWICE<br>Ulica: WROC??AWSKA  18]]></description>
          <styleUrl>#icon-1899-DB4436</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
              <value>WROC??AWSKA  18</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>AGA - SKLEP AGNIESZKA  KLAUZA</name>
          <address>55-200 O??AWA 1 MAJA 20</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 9121132550<br>Kod: 55-200<br>Miasto: O??AWA<br>Ulica: 1 MAJA 20]]></description>
          <styleUrl>#icon-1899-DB4436</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>9.12113255E9</value>
            </Data>
            <Data name="Kod">
              <value>55-200</value>
            </Data>
            <Data name="Miasto">
              <value>O??AWA</value>
            </Data>
            <Data name="Ulica">
              <value>1 MAJA 20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRAN??OWY SP????KA CYWILNA BOGDAN WODOK, MAREK PRASZKIEWICZ</name>
          <address>57-256 BARDO G????WNA 25</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8870003653<br>Kod: 57-256<br>Miasto: BARDO<br>Ulica: G????WNA 25]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
              <value>G????WNA 25</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO - PRZEMYS??OWYEDYTA BECLA</name>
          <address>59-724 OSIECZNICA ??AWSZOWA 70/10</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6121496871<br>Kod: 59-724<br>Miasto: OSIECZNICA<br>Ulica: ??AWSZOWA 70/10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
              <value>??AWSZOWA 70/10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWO-US??UGOWE "BENO" RYSZARD BERNARDY]]></name>
          <address>57-213 STOSZOWICE STOSZOWICE 99</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8871355816<br>Kod: 57-213<br>Miasto: STOSZOWICE<br>Ulica: STOSZOWICE 99]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
          <address>59-241 LEGNICKIE  POLE MIKO??AJOWICE 16</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8831664043<br>Kod: 59-241<br>Miasto: LEGNICKIE  POLE<br>Ulica: MIKO??AJOWICE 16]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
              <value>MIKO??AJOWICE 16</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY DK  DARIUSZ KRAUZE</name>
          <address>55-020 ????RAWINA AL. NIEPODLEG??OSCI 8A</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 9141170246<br>Kod: 55-020<br>Miasto: ????RAWINA<br>Ulica: AL. NIEPODLEG??OSCI 8A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>9.141170246E9</value>
            </Data>
            <Data name="Kod">
              <value>55-020</value>
            </Data>
            <Data name="Miasto">
              <value>????RAWINA</value>
            </Data>
            <Data name="Ulica">
              <value>AL. NIEPODLEG??OSCI 8A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["DELIKATESY D.W."  DOROTA ZAJ??C]]></name>
          <address>58-160 ??WIEBODZICE RYNEK  2</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8841386723<br>Kod: 58-160<br>Miasto: ??WIEBODZICE<br>Ulica: RYNEK  2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.841386723E9</value>
            </Data>
            <Data name="Kod">
              <value>58-160</value>
            </Data>
            <Data name="Miasto">
              <value>??WIEBODZICE</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK  2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DUKO SP????KA  JAWNA  D.DRAPIEJ , A.DAWIEC</name>
          <address>58-500 JELENIA G??RA SOLNA 2</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6110201369<br>Kod: 58-500<br>Miasto: JELENIA G??RA<br>Ulica: SOLNA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.110201369E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>SOLNA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GMINNA SP????DZIELNIA SAMOPOMOC CH??OPSKA W JELENIOWIE</name>
          <address>57-343 JELENI??W PLAC SP????DZIELCZY 49</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8830002914<br>Kod: 57-343<br>Miasto: JELENI??W<br>Ulica: PLAC SP????DZIELCZY 49]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.830002914E9</value>
            </Data>
            <Data name="Kod">
              <value>57-343</value>
            </Data>
            <Data name="Miasto">
              <value>JELENI??W</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC SP????DZIELCZY 49</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA"SKLEP NR 19]]></name>
          <address>55-040 BIELANY WROC??AWSKIE WROC??AWSKA 41B</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8960002640<br>Kod: 55-040<br>Miasto: BIELANY WROC??AWSKIE<br>Ulica: WROC??AWSKA 41B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.96000264E9</value>
            </Data>
            <Data name="Kod">
              <value>55-040</value>
            </Data>
            <Data name="Miasto">
              <value>BIELANY WROC??AWSKIE</value>
            </Data>
            <Data name="Ulica">
              <value>WROC??AWSKA 41B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA"]]></name>
          <address>55-040 TYNIEC NAD ??L?????? SZKOLNA 21</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8960002640<br>Kod: 55-040<br>Miasto: TYNIEC NAD ??L??????<br>Ulica: SZKOLNA 21]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.96000264E9</value>
            </Data>
            <Data name="Kod">
              <value>55-040</value>
            </Data>
            <Data name="Miasto">
              <value>TYNIEC NAD ??L??????</value>
            </Data>
            <Data name="Ulica">
              <value>SZKOLNA 21</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA"MINI MARKET]]></name>
          <address>55-040 KOBIERZYCE WITOSA 22</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8960002640<br>Kod: 55-040<br>Miasto: KOBIERZYCE<br>Ulica: WITOSA 22]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
          <name>PRZEDSI??BIORSTWO PRODUKCYJNO-HANDLOWE HE-MA HENRYKLORCZYK</name>
          <address>57-200 Z??BKOWICE ??L??SKIE RYNEK 13</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8870000991<br>Kod: 57-200<br>Miasto: Z??BKOWICE ??L??SKIE<br>Ulica: RYNEK 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.870000991E9</value>
            </Data>
            <Data name="Kod">
              <value>57-200</value>
            </Data>
            <Data name="Miasto">
              <value>Z??BKOWICE ??L??SKIE</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPRZEDSI??BIORSTWO HANDLOWE "HE-MA"SKELPSAMOOBS??UGOWY MARKET" HENRYK  LORCZYK]]></name>
          <address>57-200 Z??BKOWICE ??L??SKIE RYNEK 11</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8870000991<br>Kod: 57-200<br>Miasto: Z??BKOWICE ??L??SKIE<br>Ulica: RYNEK 11]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.870000991E9</value>
            </Data>
            <Data name="Kod">
              <value>57-200</value>
            </Data>
            <Data name="Miasto">
              <value>Z??BKOWICE ??L??SKIE</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 11</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPO??YWCZO-PRZEMYS??OWY "IRENA"-IRENA ??YGAD??O]]></name>
          <address>55-065 JORDAN??W ??L??SKI WROC??AWSKA  43</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 9141083139<br>Kod: 55-065<br>Miasto: JORDAN??W ??L??SKI<br>Ulica: WROC??AWSKA  43]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>9.141083139E9</value>
            </Data>
            <Data name="Kod">
              <value>55-065</value>
            </Data>
            <Data name="Miasto">
              <value>JORDAN??W ??L??SKI</value>
            </Data>
            <Data name="Ulica">
              <value>WROC??AWSKA  43</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO-PRZEMYS??OWY ANNA KOLA??SKA</name>
          <address>55-003 CZERNICA UL. LE??NA 1 CHRZ??STAWA MA??A</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 9121223531<br>Kod: 55-003<br>Miasto: CZERNICA<br>Ulica: UL. LE??NA 1 CHRZ??STAWA MA??A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
              <value>UL. LE??NA 1 CHRZ??STAWA MA??A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO HANDLOWO PRODUKCYJNO US??UGOWE MAGA ALICJA MAZUR</name>
          <address>58-506 JELENIA G??RA KIEPURY  10-12</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6111046511<br>Kod: 58-506<br>Miasto: JELENIA G??RA<br>Ulica: KIEPURY  10-12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.111046511E9</value>
            </Data>
            <Data name="Kod">
              <value>58-506</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>KIEPURY  10-12</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO PRODUKCYJNO HANDLOWO US??UGOWE A.T.W. MARGASI??SCY SP????KA JAWNA</name>
          <address>57-220 ZI??BICE RYNEK 19</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8871670831<br>Kod: 57-220<br>Miasto: ZI??BICE<br>Ulica: RYNEK 19]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.871670831E9</value>
            </Data>
            <Data name="Kod">
              <value>57-220</value>
            </Data>
            <Data name="Miasto">
              <value>ZI??BICE</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 19</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MARKET MAX ANITA  KURIATA BOREK STRZELI??SKI</name>
          <address>57-160 BOREK STRZELI??SKI O??AWSKA  2</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8951455141<br>Kod: 57-160<br>Miasto: BOREK STRZELI??SKI<br>Ulica: O??AWSKA  2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.951455141E9</value>
            </Data>
            <Data name="Kod">
              <value>57-160</value>
            </Data>
            <Data name="Miasto">
              <value>BOREK STRZELI??SKI</value>
            </Data>
            <Data name="Ulica">
              <value>O??AWSKA  2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRAN??OWY MARTYNKA SP????KA CYWILNAGABRIELA GAC, KRZYSZTOF GAC</name>
          <address>51-126 WROC??AW H.M. KAMIE??SKIEGO 207  U1</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8952034140<br>Kod: 51-126<br>Miasto: WROC??AW<br>Ulica: H.M. KAMIE??SKIEGO 207  U1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.95203414E9</value>
            </Data>
            <Data name="Kod">
              <value>51-126</value>
            </Data>
            <Data name="Miasto">
              <value>WROC??AW</value>
            </Data>
            <Data name="Ulica">
              <value>H.M. KAMIE??SKIEGO 207  U1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP "MAX" MISZTAL I ROGOZI??SKA SP????KA JAWNA]]></name>
          <address>55-002 KAMIENIEC WROC??AWSKI WROC??AWSKA 98</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 9121650121<br>Kod: 55-002<br>Miasto: KAMIENIEC WROC??AWSKI<br>Ulica: WROC??AWSKA 98]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>9.121650121E9</value>
            </Data>
            <Data name="Kod">
              <value>55-002</value>
            </Data>
            <Data name="Miasto">
              <value>KAMIENIEC WROC??AWSKI</value>
            </Data>
            <Data name="Ulica">
              <value>WROC??AWSKA 98</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[TADEUSZ MAZUR, ALICJA MAZUR FIRMA HANDLOWA"MAZURY" SP????KA JAWNA]]></name>
          <address>58-500 JELENIA G??RA KOMEDY TRZCI??SKIEGO  12</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6111403649<br>Kod: 58-500<br>Miasto: JELENIA G??RA<br>Ulica: KOMEDY TRZCI??SKIEGO  12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.111403649E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>KOMEDY TRZCI??SKIEGO  12</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU MARCIN MIARA</name>
          <address>54-111 WROC??AW MR??GOWSKA 78/101</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8981082029<br>Kod: 54-111<br>Miasto: WROC??AW<br>Ulica: MR??GOWSKA 78/101]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.981082029E9</value>
            </Data>
            <Data name="Kod">
              <value>54-111</value>
            </Data>
            <Data name="Miasto">
              <value>WROC??AW</value>
            </Data>
            <Data name="Ulica">
              <value>MR??GOWSKA 78/101</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MINI MARKET RAFA?? CYBULSKI KAMIL CYBULSKI SP????KA CYWILNA</name>
          <address>55-020 ????RAWINA O??AWSKA 13C, STARY ??LESZ??W</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8961589825<br>Kod: 55-020<br>Miasto: ????RAWINA<br>Ulica: O??AWSKA 13C, STARY ??LESZ??W]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.961589825E9</value>
            </Data>
            <Data name="Kod">
              <value>55-020</value>
            </Data>
            <Data name="Miasto">
              <value>????RAWINA</value>
            </Data>
            <Data name="Ulica">
              <value>O??AWSKA 13C, STARY ??LESZ??W</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MINI MARKET MAX  ZENON PISTOR</name>
          <address>57-160 BOR??W WROC??AWSKA 8</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 9140004965<br>Kod: 57-160<br>Miasto: BOR??W<br>Ulica: WROC??AWSKA 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>9.140004965E9</value>
            </Data>
            <Data name="Kod">
              <value>57-160</value>
            </Data>
            <Data name="Miasto">
              <value>BOR??W</value>
            </Data>
            <Data name="Ulica">
              <value>WROC??AWSKA 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>WOJCIECH MISZTAL AUTO MYJNIA</name>
          <address>55-002 KAMIE?? WROC??AWSKI WROC??AWSKA 96</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8961218230<br>Kod: 55-002<br>Miasto: KAMIE?? WROC??AWSKI<br>Ulica: WROC??AWSKA 96]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.96121823E9</value>
            </Data>
            <Data name="Kod">
              <value>55-002</value>
            </Data>
            <Data name="Miasto">
              <value>KAMIE?? WROC??AWSKI</value>
            </Data>
            <Data name="Ulica">
              <value>WROC??AWSKA 96</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MONO SP????KA Z OGRANICZON?? ODPOWIEDZIALNO??CI??</name>
          <address>55-220 WYSOKA MALINOWA 10</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8961597463<br>Kod: 55-220<br>Miasto: WYSOKA<br>Ulica: MALINOWA 10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
          <name>NIEZAPOMINAJKA DOMINIKA KO??CIELNA</name>
          <address>55-040 DOMAS??AW WROC??AWSKA  28B</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8941969217<br>Kod: 55-040<br>Miasto: DOMAS??AW<br>Ulica: WROC??AWSKA  28B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.941969217E9</value>
            </Data>
            <Data name="Kod">
              <value>55-040</value>
            </Data>
            <Data name="Miasto">
              <value>DOMAS??AW</value>
            </Data>
            <Data name="Ulica">
              <value>WROC??AWSKA  28B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>OLIMP SP????KA Z OGRANICZON?? ODPOWIEDZIALNO??CI??</name>
          <address>53-139 WROC??AW NOWOWIEJSKA 104A</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8992540843<br>Kod: 53-139<br>Miasto: WROC??AW<br>Ulica: NOWOWIEJSKA 104A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.992540843E9</value>
            </Data>
            <Data name="Kod">
              <value>53-139</value>
            </Data>
            <Data name="Miasto">
              <value>WROC??AW</value>
            </Data>
            <Data name="Ulica">
              <value>NOWOWIEJSKA 104A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL ARTYKU??AMI OG??LNO-SPO??YWCZYMI MI??SNO-W??DLINIARSKIMI KRYSTYNA D??BROWSKA</name>
          <address>57-360 O??DRZYCHOWICE K??ODZKIE K??ODZKA 54C</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8831020512<br>Kod: 57-360<br>Miasto: O??DRZYCHOWICE K??ODZKIE<br>Ulica: K??ODZKA 54C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.831020512E9</value>
            </Data>
            <Data name="Kod">
              <value>57-360</value>
            </Data>
            <Data name="Miasto">
              <value>O??DRZYCHOWICE K??ODZKIE</value>
            </Data>
            <Data name="Ulica">
              <value>K??ODZKA 54C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO US??UGOWA "ORION" STANIS??AW PAG??RSKI]]></name>
          <address>59-220 LEGNICA Z??OTORYJSKA 30</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6120006310<br>Kod: 59-220<br>Miasto: LEGNICA<br>Ulica: Z??OTORYJSKA 30]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
              <value>Z??OTORYJSKA 30</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZY JULIA I RAFA??  OZGA SP????KA CYWILNA</name>
          <address>55-095 MIRK??W , D??UGO????KA BRONIEWSKIEGO 3</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8961336857<br>Kod: 55-095<br>Miasto: MIRK??W , D??UGO????KA<br>Ulica: BRONIEWSKIEGO 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.961336857E9</value>
            </Data>
            <Data name="Kod">
              <value>55-095</value>
            </Data>
            <Data name="Miasto">
              <value>MIRK??W , D??UGO????KA</value>
            </Data>
            <Data name="Ulica">
              <value>BRONIEWSKIEGO 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.U.H. ARTUR PAWLAK</name>
          <address>50-321 WROC??AW STEFANA ??EROMOSKIEGO 60/2</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8991820664<br>Kod: 50-321<br>Miasto: WROC??AW<br>Ulica: STEFANA ??EROMOSKIEGO 60/2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.991820664E9</value>
            </Data>
            <Data name="Kod">
              <value>50-321</value>
            </Data>
            <Data name="Miasto">
              <value>WROC??AW</value>
            </Data>
            <Data name="Ulica">
              <value>STEFANA ??EROMOSKIEGO 60/2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPO??EM POWSZECHNA SP????DZIELNIA SPO??YWC??W SKLEP NR 2</name>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6110203428<br>Kod: 58-506<br>Miasto: JELENIA G??RA-CIEPLICE<br>Ulica: 20 LECIA 4 A]]></description>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-506</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA-CIEPLICE</value>
            </Data>
            <Data name="Ulica">
              <value>20 LECIA 4 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPO??EM POWSZECHNA SP????DZIELNIA SPO??YWC??W SKLEP NR 3</name>
          <address>58-506 JELENIA G??RA JUSZCZAKA 28</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6110203428<br>Kod: 58-506<br>Miasto: JELENIA G??RA<br>Ulica: JUSZCZAKA 28]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-506</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>JUSZCZAKA 28</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPO??EM POWSZECHNA SP????DZIELNIA SPO??YWC??WSKLEP JUBILAT</name>
          <address>58-500 JELENIA G??RA OGI??SKIEGO 13</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6110203428<br>Kod: 58-500<br>Miasto: JELENIA G??RA<br>Ulica: OGI??SKIEGO 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>OGI??SKIEGO 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPO??EM POWSZECHNA SP????DZIELNIA SPO??YWC??WSKLEP NR 1</name>
          <address>58-500 JELENIA G??RA PODG??RNA 2</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6110203428<br>Kod: 58-500<br>Miasto: JELENIA G??RA<br>Ulica: PODG??RNA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>PODG??RNA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPO??EM POWSZECHNA SP????DZIELNIA SPO??YWC??W SKLEP NR 5</name>
          <address>58-506 JELENIA G??RA PL. RATUSZOWY 19</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6110203428<br>Kod: 58-506<br>Miasto: JELENIA G??RA<br>Ulica: PL. RATUSZOWY 19]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-506</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>PL. RATUSZOWY 19</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPO??EM POWSZECHNA SP????DZIELNIA SPO??YWC??WSKLEP NR 6</name>
          <address>58-500 JELENIA G??RA R????YCKIEGO 4</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6110203428<br>Kod: 58-500<br>Miasto: JELENIA G??RA<br>Ulica: R????YCKIEGO 4]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>R????YCKIEGO 4</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SPO??EM POWSZECHNA SP????DZIELNIA SPO??YWC??WSKLEP RONDO</name>
          <address>58-500 JELENIA G??RA R????YCKIEGO 2A</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6110203428<br>Kod: 58-500<br>Miasto: JELENIA G??RA<br>Ulica: R????YCKIEGO 2A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.110203428E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>R????YCKIEGO 2A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO HANDLOWE SAWCZAK SP????KA JAWNA</name>
          <address>59-620 GRYF??W ??L??SKI KOLEJOWA 20 A</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6161475071<br>Kod: 59-620<br>Miasto: GRYF??W ??L??SKI<br>Ulica: KOLEJOWA 20 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.161475071E9</value>
            </Data>
            <Data name="Kod">
              <value>59-620</value>
            </Data>
            <Data name="Miasto">
              <value>GRYF??W ??L??SKI</value>
            </Data>
            <Data name="Ulica">
              <value>KOLEJOWA 20 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO HANDLOWE SAWCZAK SP????KA JAWNA</name>
          <address>59-620 LUBOMIERZ KOWALSKIEGO 9</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6161475071<br>Kod: 59-620<br>Miasto: LUBOMIERZ<br>Ulica: KOWALSKIEGO 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
          <name>PRZEDSI??BIORSTWO HANDLOWE SAWCZAK SP????KA JAWNA</name>
          <address>59-620 GRYF??W ??L??SKI RYNEK 37</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6161475071<br>Kod: 59-620<br>Miasto: GRYF??W ??L??SKI<br>Ulica: RYNEK 37]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.161475071E9</value>
            </Data>
            <Data name="Kod">
              <value>59-620</value>
            </Data>
            <Data name="Miasto">
              <value>GRYF??W ??L??SKI</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 37</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZY S.C. GENOWEFA SIKORA, JERZY SIKORA</name>
          <address>50-369 WROC??AW MARII CURIE-SK??ODOWSKIEJ 49</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8980014681<br>Kod: 50-369<br>Miasto: WROC??AW<br>Ulica: MARII CURIE-SK??ODOWSKIEJ 49]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.980014681E9</value>
            </Data>
            <Data name="Kod">
              <value>50-369</value>
            </Data>
            <Data name="Miasto">
              <value>WROC??AW</value>
            </Data>
            <Data name="Ulica">
              <value>MARII CURIE-SK??ODOWSKIEJ 49</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GROSZ ROMAN  SKA??ECKI</name>
          <address>55-330 MROZ??W PIASTOWSKA 2A</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8951161741<br>Kod: 55-330<br>Miasto: MROZ??W<br>Ulica: PIASTOWSKA 2A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.951161741E9</value>
            </Data>
            <Data name="Kod">
              <value>55-330</value>
            </Data>
            <Data name="Miasto">
              <value>MROZ??W</value>
            </Data>
            <Data name="Ulica">
              <value>PIASTOWSKA 2A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SMAKOSZ II SP????KA CYWILNA ALICJA MAZURTADEUSZ MAZUR  I PIOTR MAZUR</name>
          <address>58-500 JELENIA G??RA PLAC PIASTOWSKI 34</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6112478508<br>Kod: 58-500<br>Miasto: JELENIA G??RA<br>Ulica: PLAC PIASTOWSKI 34]]></description>
          <styleUrl>#icon-1502-DB4436</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.112478508E9</value>
            </Data>
            <Data name="Kod">
              <value>58-500</value>
            </Data>
            <Data name="Miasto">
              <value>JELENIA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC PIASTOWSKI 34</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>BEATA WAWRZYNIAK  SKLEP SPO??YWCZO-PRZEMYS??OWY</name>
          <address>59-724 OSIECZNICA LUBA??SKA 45B</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 9241080117<br>Kod: 59-724<br>Miasto: OSIECZNICA<br>Ulica: LUBA??SKA 45B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
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
              <value>LUBA??SKA 45B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>WITAMINA  SP.J. TRZ??SOWSCY</name>
          <address>59-800 LUBA?? BOLES??AWA CHROBREGO 3</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6130002673<br>Kod: 59-800<br>Miasto: LUBA??<br>Ulica: BOLES??AWA CHROBREGO 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.130002673E9</value>
            </Data>
            <Data name="Kod">
              <value>59-800</value>
            </Data>
            <Data name="Miasto">
              <value>LUBA??</value>
            </Data>
            <Data name="Ulica">
              <value>BOLES??AWA CHROBREGO 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>WITAMINA  SP.J. TRZ??SOWSCY</name>
          <address>59-800 LUBA?? SP????DZIELCZA 13</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 6130002673<br>Kod: 59-800<br>Miasto: LUBA??<br>Ulica: SP????DZIELCZA 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>6.130002673E9</value>
            </Data>
            <Data name="Kod">
              <value>59-800</value>
            </Data>
            <Data name="Miasto">
              <value>LUBA??</value>
            </Data>
            <Data name="Ulica">
              <value>SP????DZIELCZA 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY D.W. DOROTA ZAJ??CDELIKATESY SUDECKIE</name>
          <address>58-160 ??WIEBODZICE OS. SUDECKIE 10</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8841386723<br>Kod: 58-160<br>Miasto: ??WIEBODZICE<br>Ulica: OS. SUDECKIE 10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.841386723E9</value>
            </Data>
            <Data name="Kod">
              <value>58-160</value>
            </Data>
            <Data name="Miasto">
              <value>??WIEBODZICE</value>
            </Data>
            <Data name="Ulica">
              <value>OS. SUDECKIE 10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FAMILY BIS SP. Z O.O.SP????KA KOMANDYTOWA</name>
          <address>58-100 ??WIDNICA KAROLA SZYMANOWSKIEGO  13</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8842788671<br>Kod: 58-100<br>Miasto: ??WIDNICA<br>Ulica: KAROLA SZYMANOWSKIEGO  13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.842788671E9</value>
            </Data>
            <Data name="Kod">
              <value>58-100</value>
            </Data>
            <Data name="Miasto">
              <value>??WIDNICA</value>
            </Data>
            <Data name="Ulica">
              <value>KAROLA SZYMANOWSKIEGO  13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL DETALICZNY WITOLD ZAJ??C</name>
          <address>58-160 ??WIEBODZICE BOLES??AWA KRZYWOUSTEGO 44</address>
          <description><![CDATA[Wojew??dztwo: dolno??l??skie<br>NIP: 8841386700<br>Kod: 58-160<br>Miasto: ??WIEBODZICE<br>Ulica: BOLES??AWA KRZYWOUSTEGO 44]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>dolno??l??skie</value>
            </Data>
            <Data name="NIP">
              <value>8.8413867E9</value>
            </Data>
            <Data name="Kod">
              <value>58-160</value>
            </Data>
            <Data name="Miasto">
              <value>??WIEBODZICE</value>
            </Data>
            <Data name="Ulica">
              <value>BOLES??AWA KRZYWOUSTEGO 44</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP "ADRIAN" TOMASZ SARNIAK]]></name>
          <address>87-865 IZBICA KUJAWSKA PL. WOLNO??CI  21</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 6661625740<br>Kod: 87-865<br>Miasto: IZBICA KUJAWSKA<br>Ulica: PL. WOLNO??CI  21]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>PL. WOLNO??CI  21</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>AGRO WINNERS SP????KA Z OGRANICZON?? ODPOWIEDZIALNO??CI??</name>
          <address>86-131 JE??EWO G????WNA 20</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8762471110<br>Kod: 86-131<br>Miasto: JE??EWO<br>Ulica: G????WNA 20]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.76247111E9</value>
            </Data>
            <Data name="Kod">
              <value>86-131</value>
            </Data>
            <Data name="Miasto">
              <value>JE??EWO</value>
            </Data>
            <Data name="Ulica">
              <value>G????WNA 20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO HANDLOWO-US??UGOWE BARTKOWSKA MA??GORZATA SKLEP ABC</name>
          <address>85-171 BYDGOSZCZ 11 LISTOPADA 8</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 5541120706<br>Kod: 85-171<br>Miasto: BYDGOSZCZ<br>Ulica: 11 LISTOPADA 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 9531021057<br>Kod: 85-132<br>Miasto: BYDGOSZCZ<br>Ulica: UGORY  23]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>GMINNA SP????DZIELNIA SAMOPOMOC CH??OPSKA</name>
          <address>87-620 KIK???? PLAC KO??CIUSZKI 9</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8930000180<br>Kod: 87-620<br>Miasto: KIK????<br>Ulica: PLAC KO??CIUSZKI 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.93000018E9</value>
            </Data>
            <Data name="Kod">
              <value>87-620</value>
            </Data>
            <Data name="Miasto">
              <value>KIK????</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC KO??CIUSZKI 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL HURTOWO-DETALICZNY E.CILI??D??H. HANY??EWSKA</name>
          <address>86-061 BRZOZA PRZEMYS??OWA 1 A</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 5542987620<br>Kod: 86-061<br>Miasto: BRZOZA<br>Ulica: PRZEMYS??OWA 1 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>PRZEMYS??OWA 1 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ALFA - JAROS??AW KOZIMI??SKI</name>
          <address>87-800 W??OC??AWEK MONIUSZKI  1</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8881848868<br>Kod: 87-800<br>Miasto: W??OC??AWEK<br>Ulica: MONIUSZKI  1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.881848868E9</value>
            </Data>
            <Data name="Kod">
              <value>87-800</value>
            </Data>
            <Data name="Miasto">
              <value>W??OC??AWEK</value>
            </Data>
            <Data name="Ulica">
              <value>MONIUSZKI  1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[JAN KUBACKI P.P.H.U. "KUBA"]]></name>
          <address>88-230 PIOTRK??W KUJAWSKI DWORCOWA 26</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8890002935<br>Kod: 88-230<br>Miasto: PIOTRK??W KUJAWSKI<br>Ulica: DWORCOWA 26]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.890002935E9</value>
            </Data>
            <Data name="Kod">
              <value>88-230</value>
            </Data>
            <Data name="Miasto">
              <value>PIOTRK??W KUJAWSKI</value>
            </Data>
            <Data name="Ulica">
              <value>DWORCOWA 26</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO US??UGOWA "MARKO" MAREK ZALEWSKI]]></name>
          <address>88-160 JANIKOWO SZKOLNA  17 KO??ODZIEJOWO</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 5571408211<br>Kod: 88-160<br>Miasto: JANIKOWO<br>Ulica: SZKOLNA  17 KO??ODZIEJOWO]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>SZKOLNA  17 KO??ODZIEJOWO</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GALERIA PA??UCKA</name>
          <address>88-400 ??NIN GNIE??NIE??SKA  1 F</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 5620000623<br>Kod: 88-400<br>Miasto: ??NIN<br>Ulica: GNIE??NIE??SKA  1 F]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.620000623E9</value>
            </Data>
            <Data name="Kod">
              <value>88-400</value>
            </Data>
            <Data name="Miasto">
              <value>??NIN</value>
            </Data>
            <Data name="Ulica">
              <value>GNIE??NIE??SKA  1 F</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWA PIOTR RYDZIK</name>
          <address>87-200 W??BRZE??NO 1-GO MAJA 43</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8780001544<br>Kod: 87-200<br>Miasto: W??BRZE??NO<br>Ulica: 1-GO MAJA 43]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.780001544E9</value>
            </Data>
            <Data name="Kod">
              <value>87-200</value>
            </Data>
            <Data name="Miasto">
              <value>W??BRZE??NO</value>
            </Data>
            <Data name="Ulica">
              <value>1-GO MAJA 43</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAWA SAWICKI I SP????KA SP.J.</name>
          <address>86-134 DRAGACZ DOLNA GRUPA 23</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8762467404<br>Kod: 86-134<br>Miasto: DRAGACZ<br>Ulica: DOLNA GRUPA 23]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>SAWA SAWICKI I SP????KA SP.J.SKLEP RZ??DZIK 2</name>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8762467404<br>Kod: 86-300<br>Miasto: GRUDZI??DZ<br>Ulica: SOBIESKIEGO 5]]></description>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.762467404E9</value>
            </Data>
            <Data name="Kod">
              <value>86-300</value>
            </Data>
            <Data name="Miasto">
              <value>GRUDZI??DZ</value>
            </Data>
            <Data name="Ulica">
              <value>SOBIESKIEGO 5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWE  "JANSAW" SKLEPRZ??DZIK JANUSZ SAWICKI]]></name>
          <address>86-300 GRUDZI??DZ ????GI  9</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8760202794<br>Kod: 86-300<br>Miasto: GRUDZI??DZ<br>Ulica: ????GI  9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.760202794E9</value>
            </Data>
            <Data name="Kod">
              <value>86-300</value>
            </Data>
            <Data name="Miasto">
              <value>GRUDZI??DZ</value>
            </Data>
            <Data name="Ulica">
              <value>????GI  9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SP????DZIELNIA HANDLOWO--ROLNICZAW CZERNIEWICACH   SKLEP NUMER 17 CHOCE??</name>
          <address>87-850 CHOCE?? SIKORSKIEGO 15</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8880200384<br>Kod: 87-850<br>Miasto: CHOCE??<br>Ulica: SIKORSKIEGO 15]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.880200384E9</value>
            </Data>
            <Data name="Kod">
              <value>87-850</value>
            </Data>
            <Data name="Miasto">
              <value>CHOCE??</value>
            </Data>
            <Data name="Ulica">
              <value>SIKORSKIEGO 15</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SP????DZIELNIA HANDLOWO-ROLNICZAW CZERNIEWICACH SKLEP NUMER 1 ??MI??OWICE</name>
          <address>87-850 CHOCE?? ??MI??OWICE 31</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8880200384<br>Kod: 87-850<br>Miasto: CHOCE??<br>Ulica: ??MI??OWICE 31]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.880200384E9</value>
            </Data>
            <Data name="Kod">
              <value>87-850</value>
            </Data>
            <Data name="Miasto">
              <value>CHOCE??</value>
            </Data>
            <Data name="Ulica">
              <value>??MI??OWICE 31</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA TALS HURT-DETAL STEFAN JAWORSKI</name>
          <address>87-126 OBROWO SADOWA 2</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8790006299<br>Kod: 87-126<br>Miasto: OBROWO<br>Ulica: SADOWA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8790006299<br>Kod: 87-408<br>Miasto: CIECHOCIN<br>Ulica: CIECHOCIN 176]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8790006299<br>Kod: 87-123<br>Miasto: DOBRZEJEWICE<br>Ulica: DOBRZEJEWICE 73]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8790006299<br>Kod: 87-123<br>Miasto: DOBRZEJEWICE<br>Ulica: DOBRZEJEWICE 11 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>TORA SP????KA JAWNATOMASZ RAK  ROMAN  SO??TAN</name>
          <address>85-684 Bydgoszcz SKROMNA 8</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 5542193363<br>Kod: 85-684<br>Miasto: Bydgoszcz<br>Ulica: SKROMNA 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>SKLEP WIELOBRAN??OWY KRYSTYNA WO??NIAK</name>
          <address>85-674 BYDGOSZCZ GDA??SKA  146</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 9670749762<br>Kod: 85-674<br>Miasto: BYDGOSZCZ<br>Ulica: GDA??SKA  146]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>GDA??SKA  146</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO US??UGOWA PAWE?? WSZELAKI</name>
          <address>87-602 CHROSTKOWO CHROSTKOWO  101</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 4660304257<br>Kod: 87-602<br>Miasto: CHROSTKOWO<br>Ulica: CHROSTKOWO  101]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>86-300 GRUDZI??DZ LEGION??W 1A</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8761462020<br>Kod: 86-300<br>Miasto: GRUDZI??DZ<br>Ulica: LEGION??W 1A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.76146202E9</value>
            </Data>
            <Data name="Kod">
              <value>86-300</value>
            </Data>
            <Data name="Miasto">
              <value>GRUDZI??DZ</value>
            </Data>
            <Data name="Ulica">
              <value>LEGION??W 1A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ADI KING BARBARA OG??RKIEWICZ</name>
          <address>68-210 NOWE CZAPLE KOPALNIANA 4</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9281695635<br>Kod: 68-210<br>Miasto: NOWE CZAPLE<br>Ulica: KOPALNIANA 4]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>BIA??Y DOMEK SKLEP SPO??YWCZY NATALIA DO??OWICZ</name>
          <address>66-300 MI??DZYRZECZ KOPERNIKA 491</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 5961634292<br>Kod: 66-300<br>Miasto: MI??DZYRZECZ<br>Ulica: KOPERNIKA 491]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.961634292E9</value>
            </Data>
            <Data name="Kod">
              <value>66-300</value>
            </Data>
            <Data name="Miasto">
              <value>MI??DZYRZECZ</value>
            </Data>
            <Data name="Ulica">
              <value>KOPERNIKA 491</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO - US??UGOWA "BM" SP????KA CYWILNA BEATA ZARAZA, BOGUS??AW ZARAZA]]></name>
          <address>66-615 D??BIE ??U??YCKA  3 C</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9261565013<br>Kod: 66-615<br>Miasto: D??BIE<br>Ulica: ??U??YCKA  3 C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.261565013E9</value>
            </Data>
            <Data name="Kod">
              <value>66-615</value>
            </Data>
            <Data name="Miasto">
              <value>D??BIE</value>
            </Data>
            <Data name="Ulica">
              <value>??U??YCKA  3 C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>JAROS??AW CZERNICKI ZAK??AD MASARNICZYCZERNICKI I SYN</name>
          <address>68-131 WYMIARKI KO??CIUSZKI  25</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9241599109<br>Kod: 68-131<br>Miasto: WYMIARKI<br>Ulica: KO??CIUSZKI  25]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>KO??CIUSZKI  25</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[MAREK PODKO??CIELNY "DARMARTOM"]]></name>
          <address>68-100 ??AGA?? WESO??A 42</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9241399132<br>Kod: 68-100<br>Miasto: ??AGA??<br>Ulica: WESO??A 42]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241399132E9</value>
            </Data>
            <Data name="Kod">
              <value>68-100</value>
            </Data>
            <Data name="Miasto">
              <value>??AGA??</value>
            </Data>
            <Data name="Ulica">
              <value>WESO??A 42</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRAN??OWY ROMAN DYTKO I BOGUS??AW DYTKO SP????KA JAWNA MARKET</name>
          <address>67-120 KO??UCH??W CHOPINA 2</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9250012374<br>Kod: 67-120<br>Miasto: KO??UCH??W<br>Ulica: CHOPINA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>67-120</value>
            </Data>
            <Data name="Miasto">
              <value>KO??UCH??W</value>
            </Data>
            <Data name="Ulica">
              <value>CHOPINA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRAN??OWY ROMAN DYTKO I BOGUS??AW DYTKO SP????KA JAWNA</name>
          <address>67-100 NOWA S??L ALEKSANDRA FREDRY  8</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9250012374<br>Kod: 67-100<br>Miasto: NOWA S??L<br>Ulica: ALEKSANDRA FREDRY  8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>67-100</value>
            </Data>
            <Data name="Miasto">
              <value>NOWA S??L</value>
            </Data>
            <Data name="Ulica">
              <value>ALEKSANDRA FREDRY  8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRAN??OWY ROMAN DYTKO I BOGUS??AW DYTKO SP????KA JAWNA</name>
          <address>65-936 ZIELONA G??RA ??O??NIERZY 2 ARMII 30-40</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9250012374<br>Kod: 65-936<br>Miasto: ZIELONA G??RA<br>Ulica: ??O??NIERZY 2 ARMII 30-40]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>65-936</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>??O??NIERZY 2 ARMII 30-40</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRAN??OWY ROMAN DYTKO I BOGUS??AW DYTKO SP????KA JAWNA MARKET</name>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9250012374<br>Kod: 67-120<br>Miasto: KO??UCH??W<br>Ulica: 22 -LIPCA 1807/1]]></description>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>67-120</value>
            </Data>
            <Data name="Miasto">
              <value>KO??UCH??W</value>
            </Data>
            <Data name="Ulica">
              <value>22 -LIPCA 1807/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRAN??OWY ROMAN DYTKO I BOGUS??AW DYTKO SP????KA JAWNA</name>
          <address>67-124 NOWE MIASTECZKO D??UGA 4</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9250012374<br>Kod: 67-124<br>Miasto: NOWE MIASTECZKO<br>Ulica: D??UGA 4]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>D??UGA 4</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWO - US??UGOWE "EMILA" ROBERT MATUSZAK]]></name>
          <address>66-016 CZERWIE??SK BOLES??AWA CHROBREGO 1</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9291485141<br>Kod: 66-016<br>Miasto: CZERWIE??SK<br>Ulica: BOLES??AWA CHROBREGO 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.291485141E9</value>
            </Data>
            <Data name="Kod">
              <value>66-016</value>
            </Data>
            <Data name="Miasto">
              <value>CZERWIE??SK</value>
            </Data>
            <Data name="Ulica">
              <value>BOLES??AWA CHROBREGO 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWO US??UGOWE "EMILA"ROBERT MATUSZAK]]></name>
          <address>65-001 ZIELONA G??RA ZAWADA, UL.ZIELONOG??RSKA 32</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9291485141<br>Kod: 65-001<br>Miasto: ZIELONA G??RA<br>Ulica: ZAWADA, UL.ZIELONOG??RSKA 32]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.291485141E9</value>
            </Data>
            <Data name="Kod">
              <value>65-001</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>ZAWADA, UL.ZIELONOG??RSKA 32</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PAWILON HANDLOWY "EMILA" MATUSZAK IWONA]]></name>
          <address>65-001 ZIELONA G??RA GRUNWALDZKA  43</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9730392543<br>Kod: 65-001<br>Miasto: ZIELONA G??RA<br>Ulica: GRUNWALDZKA  43]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.730392543E9</value>
            </Data>
            <Data name="Kod">
              <value>65-001</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>GRUNWALDZKA  43</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PAWILON HANDLOWY "EMILA" MATUSZAK IWONA]]></name>
          <address>66-015 PRZYLEP PRZYLEP - SOLIDARNO??CI 30 D</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9730392543<br>Kod: 66-015<br>Miasto: PRZYLEP<br>Ulica: PRZYLEP - SOLIDARNO??CI 30 D]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>PRZYLEP - SOLIDARNO??CI 30 D</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPHU "FENIKS"]]></name>
          <address>66-200 ??WIEBODZIN POZNA??SKA 29</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9271289193<br>Kod: 66-200<br>Miasto: ??WIEBODZIN<br>Ulica: POZNA??SKA 29]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271289193E9</value>
            </Data>
            <Data name="Kod">
              <value>66-200</value>
            </Data>
            <Data name="Miasto">
              <value>??WIEBODZIN</value>
            </Data>
            <Data name="Ulica">
              <value>POZNA??SKA 29</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GROSIK SP????KA Z OGRANICZON?? ODPOWIEDZIALNO??CI?? SKLEP GROSIK 2</name>
          <address>66-410 SKWIERZYNA JANA III SOBIESKIEGO 25</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9271929391<br>Kod: 66-410<br>Miasto: SKWIERZYNA<br>Ulica: JANA III SOBIESKIEGO 25]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>GROSIK SP????KA Z OGRANICZON?? ODPOWIEDZIALNO??CI?? SKLEP GROSIK 7</name>
          <address>66-200 ??WIEBODZIN PI??SUDSKIEGO  30</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9271929391<br>Kod: 66-200<br>Miasto: ??WIEBODZIN<br>Ulica: PI??SUDSKIEGO  30]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271929391E9</value>
            </Data>
            <Data name="Kod">
              <value>66-200</value>
            </Data>
            <Data name="Miasto">
              <value>??WIEBODZIN</value>
            </Data>
            <Data name="Ulica">
              <value>PI??SUDSKIEGO  30</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>OSIEDLAK  ARTYKU??Y SPO??YWCZE PRZEMYS??AW GRUDA</name>
          <address>66-300 MI??DZYRZECZ KOPERNIKA 491</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 5961358432<br>Kod: 66-300<br>Miasto: MI??DZYRZECZ<br>Ulica: KOPERNIKA 491]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.961358432E9</value>
            </Data>
            <Data name="Kod">
              <value>66-300</value>
            </Data>
            <Data name="Miasto">
              <value>MI??DZYRZECZ</value>
            </Data>
            <Data name="Ulica">
              <value>KOPERNIKA 491</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANTOM JACEK  MAJEWSKI</name>
          <address>66-200 ??WIEBODZIN WOJSKA POLSKIEGO  10</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9271069540<br>Kod: 66-200<br>Miasto: ??WIEBODZIN<br>Ulica: WOJSKA POLSKIEGO  10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.27106954E9</value>
            </Data>
            <Data name="Kod">
              <value>66-200</value>
            </Data>
            <Data name="Miasto">
              <value>??WIEBODZIN</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA POLSKIEGO  10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNO-SPO??YWCZY J??ZEF HO????WKO</name>
          <address>69-108 CYBINKA BIEGAN??W</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9260008629<br>Kod: 69-108<br>Miasto: CYBINKA<br>Ulica: BIEGAN??W]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>BIEGAN??W</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWO US??UGOWE "INEX" INGAKACZOR]]></name>
          <address>65-762 ZIELONA G??RA WOJSKA POLSKIEGO 88C</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9730175314<br>Kod: 65-762<br>Miasto: ZIELONA G??RA<br>Ulica: WOJSKA POLSKIEGO 88C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.730175314E9</value>
            </Data>
            <Data name="Kod">
              <value>65-762</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA POLSKIEGO 88C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWO US??UGOWE "JOBEX" BOGUS??AW GOJDKA]]></name>
          <address>66-300 MI??DZYRZECZ WOJSKA POLSKEGO NR DZ 611/61</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 5961258794<br>Kod: 66-300<br>Miasto: MI??DZYRZECZ<br>Ulica: WOJSKA POLSKEGO NR DZ 611/61]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.961258794E9</value>
            </Data>
            <Data name="Kod">
              <value>66-300</value>
            </Data>
            <Data name="Miasto">
              <value>MI??DZYRZECZ</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA POLSKEGO NR DZ 611/61</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWO US??UGOWE "KIER" SEBASTIAN KIERUL]]></name>
          <address>66-600 KROSNO ODRZA??SKIE CZARNOWO 19</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9261467262<br>Kod: 66-600<br>Miasto: KROSNO ODRZA??SKIE<br>Ulica: CZARNOWO 19]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.261467262E9</value>
            </Data>
            <Data name="Kod">
              <value>66-600</value>
            </Data>
            <Data name="Miasto">
              <value>KROSNO ODRZA??SKIE</value>
            </Data>
            <Data name="Ulica">
              <value>CZARNOWO 19</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWO US??UGOWE "MARCO" MA??GORZATA CELI??SKA]]></name>
          <address>65-960 ZIELONA G??RA CYPRYSOWA 1</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9271008461<br>Kod: 65-960<br>Miasto: ZIELONA G??RA<br>Ulica: CYPRYSOWA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271008461E9</value>
            </Data>
            <Data name="Kod">
              <value>65-960</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>CYPRYSOWA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWO-US??UGOWE  "MARCO"MA??GORZATA CELI??SKA]]></name>
          <address>65-752 ZIELONA G??RA OBJAZDOWA</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9271008461<br>Kod: 65-752<br>Miasto: ZIELONA G??RA<br>Ulica: OBJAZDOWA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271008461E9</value>
            </Data>
            <Data name="Kod">
              <value>65-752</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>OBJAZDOWA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWO US??UGOWE "MARCO" MA??GORZATA CELI??SKA]]></name>
          <address>65-001 ZIELONA G??RA OKULICKIEGO 37</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9271008461<br>Kod: 65-001<br>Miasto: ZIELONA G??RA<br>Ulica: OKULICKIEGO 37]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271008461E9</value>
            </Data>
            <Data name="Kod">
              <value>65-001</value>
            </Data>
            <Data name="Miasto">
              <value>ZIELONA G??RA</value>
            </Data>
            <Data name="Ulica">
              <value>OKULICKIEGO 37</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPO??YWCZY "PLUS" JAROS??AW PODYMA]]></name>
          <address>68-130 GOZDNICA KO??CIELNA 14</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9241488019<br>Kod: 68-130<br>Miasto: GOZDNICA<br>Ulica: KO??CIELNA 14]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>KO??CIELNA 14</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPO??YWCZY "PLUS" JAROS??AW PODYMA]]></name>
          <address>59-950 RUSZ??W II ARMII  WOJSKA POLSKIEGO 2</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9241488019<br>Kod: 59-950<br>Miasto: RUSZ??W<br>Ulica: II ARMII  WOJSKA POLSKIEGO 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241488019E9</value>
            </Data>
            <Data name="Kod">
              <value>59-950</value>
            </Data>
            <Data name="Miasto">
              <value>RUSZ??W</value>
            </Data>
            <Data name="Ulica">
              <value>II ARMII  WOJSKA POLSKIEGO 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPOZYWCZY "PLUS" JAROS??AW PODYMA]]></name>
          <address>59-940 W??GLINIEC SIKORSKIEGO  26</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9241488019<br>Kod: 59-940<br>Miasto: W??GLINIEC<br>Ulica: SIKORSKIEGO  26]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241488019E9</value>
            </Data>
            <Data name="Kod">
              <value>59-940</value>
            </Data>
            <Data name="Miasto">
              <value>W??GLINIEC</value>
            </Data>
            <Data name="Ulica">
              <value>SIKORSKIEGO  26</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ORION S.C.S.PAG??RSKI, J. SZELEJEWSKI .</name>
          <address>59-726 ??WI??TOSZ??W BRZOZOWA 14</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 6121861537<br>Kod: 59-726<br>Miasto: ??WI??TOSZ??W<br>Ulica: BRZOZOWA 14]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>6.121861537E9</value>
            </Data>
            <Data name="Kod">
              <value>59-726</value>
            </Data>
            <Data name="Miasto">
              <value>??WI??TOSZ??W</value>
            </Data>
            <Data name="Ulica">
              <value>BRZOZOWA 14</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO US??UGOWA "ORION" STANIS??AW PAG??RSKI]]></name>
          <address>59-724 OSIECZNICA PAROWA  40</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 6120006310<br>Kod: 59-724<br>Miasto: OSIECZNICA<br>Ulica: PAROWA  40]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>59-700 BOLES??AWIEC BRZE??NIK 37 A</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 6121468544<br>Kod: 59-700<br>Miasto: BOLES??AWIEC<br>Ulica: BRZE??NIK 37 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>6.121468544E9</value>
            </Data>
            <Data name="Kod">
              <value>59-700</value>
            </Data>
            <Data name="Miasto">
              <value>BOLES??AWIEC</value>
            </Data>
            <Data name="Ulica">
              <value>BRZE??NIK 37 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO HANDLOWO-US??UGOWE  J??ZEFA OSSOLI??SKA-PASIEKA</name>
          <address>66-460 WITNICA OGRODOWA  11D</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 5991755540<br>Kod: 66-460<br>Miasto: WITNICA<br>Ulica: OGRODOWA  11D]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>SKLEP SPO??YWCZO-PRZEMYS??OWY JANUSZ PATYK</name>
          <address>67-200 G??OG??W RUDNOWSKA  85</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 6930002321<br>Kod: 67-200<br>Miasto: G??OG??W<br>Ulica: RUDNOWSKA  85]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>6.930002321E9</value>
            </Data>
            <Data name="Kod">
              <value>67-200</value>
            </Data>
            <Data name="Miasto">
              <value>G??OG??W</value>
            </Data>
            <Data name="Ulica">
              <value>RUDNOWSKA  85</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO-PRZEMYS??OWY MA??A GASTRONOMIAANNA RYMARZ</name>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9241493003<br>Kod: 67-320<br>Miasto: MA??OMICE<br>Ulica: LUBIECH??W 93/1]]></description>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241493003E9</value>
            </Data>
            <Data name="Kod">
              <value>67-320</value>
            </Data>
            <Data name="Miasto">
              <value>MA??OMICE</value>
            </Data>
            <Data name="Ulica">
              <value>LUBIECH??W 93/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PAWILON HANDLOWY MAGDALENA STEFAN</name>
          <address>67-200 G??OG??W SATURNA 14</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 6932029666<br>Kod: 67-200<br>Miasto: G??OG??W<br>Ulica: SATURNA 14]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>6.932029666E9</value>
            </Data>
            <Data name="Kod">
              <value>67-200</value>
            </Data>
            <Data name="Miasto">
              <value>G??OG??W</value>
            </Data>
            <Data name="Ulica">
              <value>SATURNA 14</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO-PRZEMYS??OWY STANIS??AW SZYMA??SKI</name>
          <address>67-415 KOLSKO PIASTOWSKA 40</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9230023535<br>Kod: 67-415<br>Miasto: KOLSKO<br>Ulica: PIASTOWSKA 40]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>PRZEDSI??BIORSTWO HANDLOWO-US??UGOWE TOM-KRYS TOMASZ I STEFANIA P??OCINIAK SP????KA CYWILNA</name>
          <address>56-215 NIECHL??W G??OGOWSKA 13</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 4970091241<br>Kod: 56-215<br>Miasto: NIECHL??W<br>Ulica: G??OGOWSKA 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>4.970091241E9</value>
            </Data>
            <Data name="Kod">
              <value>56-215</value>
            </Data>
            <Data name="Miasto">
              <value>NIECHL??W</value>
            </Data>
            <Data name="Ulica">
              <value>G??OGOWSKA 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO HANDLOWO-US??UGOWE TOM-KRYS TOMASZ I STEFANIA P??OCINIAK SP????KA CYWILNA</name>
          <address>67-200 G??OG??W RYCERSKA 25-27</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 4970091241<br>Kod: 67-200<br>Miasto: G??OG??W<br>Ulica: RYCERSKA 25-27]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>4.970091241E9</value>
            </Data>
            <Data name="Kod">
              <value>67-200</value>
            </Data>
            <Data name="Miasto">
              <value>G??OG??W</value>
            </Data>
            <Data name="Ulica">
              <value>RYCERSKA 25-27</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPHU " MIKA "  ANDRZEJ UDZIELASKLEP FIRMOWY]]></name>
          <address>69-110 RZEPIN DWORCOWA 48</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 5980002096<br>Kod: 69-110<br>Miasto: RZEPIN<br>Ulica: DWORCOWA 48]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>69-110 RZEPIN ALEJA WOLNO??CI 3</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 5980002096<br>Kod: 69-110<br>Miasto: RZEPIN<br>Ulica: ALEJA WOLNO??CI 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>ALEJA WOLNO??CI 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KAMILA W??ODARCZAK  SKLEP SPO??YWCZY</name>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9251965685<br>Kod: 67-312<br>Miasto: NIEGOS??AWICE<br>Ulica: PRZEC??AW 302/3]]></description>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.251965685E9</value>
            </Data>
            <Data name="Kod">
              <value>67-312</value>
            </Data>
            <Data name="Miasto">
              <value>NIEGOS??AWICE</value>
            </Data>
            <Data name="Ulica">
              <value>PRZEC??AW 302/3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNOSPO??YWCZY KRYSTYNA ZGANIACZ</name>
          <address>68-300 LUBSKO WROC??AWSKA 57</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9280009454<br>Kod: 68-300<br>Miasto: LUBSKO<br>Ulica: WROC??AWSKA 57]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>WROC??AWSKA 57</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDEL ART. SPO??YWCZYMI  I TYTONIOWYMIS??AWOMIR ZWOLAK</name>
          <address>69-100 S??UBICE OS. WIMAR 19</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 5981037760<br>Kod: 69-100<br>Miasto: S??UBICE<br>Ulica: OS. WIMAR 19]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>5.98103776E9</value>
            </Data>
            <Data name="Kod">
              <value>69-100</value>
            </Data>
            <Data name="Miasto">
              <value>S??UBICE</value>
            </Data>
            <Data name="Ulica">
              <value>OS. WIMAR 19</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO-PRZEMYS??OWYWOJCIECH ??ELAZEK</name>
          <address>68-210 NOWE CZAPLE NIWICA 32</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9282077253<br>Kod: 68-210<br>Miasto: NOWE CZAPLE<br>Ulica: NIWICA 32]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>83-422 NOWY BARKOCZYN JANA PAW??A II 9</address>
          <description><![CDATA[Wojew??dztwo: pomorskie<br>NIP: 5910008171<br>Kod: 83-422<br>Miasto: NOWY BARKOCZYN<br>Ulica: JANA PAW??A II 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>JANA PAW??A II 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.P.H. PEKROL ARKADIUSZ PEEK</name>
          <address>83-420 LINIEWO G??ODOWO 54/1</address>
          <description><![CDATA[Wojew??dztwo: pomorskie<br>NIP: 5910008171<br>Kod: 83-420<br>Miasto: LINIEWO<br>Ulica: G??ODOWO 54/1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>G??ODOWO 54/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.P.H. PEKROL ARKADIUSZ PEEK</name>
          <address>83-420 LINIEWO WYZWOLENIA 9</address>
          <description><![CDATA[Wojew??dztwo: pomorskie<br>NIP: 5910008171<br>Kod: 83-420<br>Miasto: LINIEWO<br>Ulica: WYZWOLENIA 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <description><![CDATA[Wojew??dztwo: pomorskie<br>NIP: 5910008171<br>Kod: 83-404<br>Miasto: NOWA KARCZMA<br>Ulica: STAROGARDZKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>76-150 DAR??OWO MORSKA 19 WICIE</address>
          <description><![CDATA[Wojew??dztwo: pomorskie<br>NIP: 9531518651<br>Kod: 76-150<br>Miasto: DAR??OWO<br>Ulica: MORSKA 19 WICIE]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>9.531518651E9</value>
            </Data>
            <Data name="Kod">
              <value>76-150</value>
            </Data>
            <Data name="Miasto">
              <value>DAR??OWO</value>
            </Data>
            <Data name="Ulica">
              <value>MORSKA 19 WICIE</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ABAMIX  SP.J.  ADAM SZYDLEWSKI, MICHA?? SZYDLEWSKI</name>
          <address>64-115 WILKOWICE ??WI??CIECHOWSKA 2</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6971897941<br>Kod: 64-115<br>Miasto: WILKOWICE<br>Ulica: ??WI??CIECHOWSKA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>??WI??CIECHOWSKA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPO??YWCZO-PRZEMYS??OWY "ABC" DANUTA SMOLI??SKA]]></name>
          <address>62-330 NEKLA DWORCOWA 1 A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7891105298<br>Kod: 62-330<br>Miasto: NEKLA<br>Ulica: DWORCOWA 1 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>P.P.H.U.  ABC-DS??AWOMIR  WOJDANOWICZ</name>
          <address>64-710 PO??AJEWO LUDOMY 71</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7661239167<br>Kod: 64-710<br>Miasto: PO??AJEWO<br>Ulica: LUDOMY 71]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661239167E9</value>
            </Data>
            <Data name="Kod">
              <value>64-710</value>
            </Data>
            <Data name="Miasto">
              <value>PO??AJEWO</value>
            </Data>
            <Data name="Ulica">
              <value>LUDOMY 71</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ADI FIRMA US??UGOWO HANDLOWA ADAM BIESIADA</name>
          <address>62-020 SWARZ??DZ PLAC HANDLOWY 1 DOSTAWA DO 8</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7781065132<br>Kod: 62-020<br>Miasto: SWARZ??DZ<br>Ulica: PLAC HANDLOWY 1 DOSTAWA DO 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.781065132E9</value>
            </Data>
            <Data name="Kod">
              <value>62-020</value>
            </Data>
            <Data name="Miasto">
              <value>SWARZ??DZ</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC HANDLOWY 1 DOSTAWA DO 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[TRANSPORT - HANDEL "AGRO-JAR" JOANNA DRO??D??Y??SKA]]></name>
          <address>64-400 MI??DZYCH??D MNICHY 12</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 5951331667<br>Kod: 64-400<br>Miasto: MI??DZYCH??D<br>Ulica: MNICHY 12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.951331667E9</value>
            </Data>
            <Data name="Kod">
              <value>64-400</value>
            </Data>
            <Data name="Miasto">
              <value>MI??DZYCH??D</value>
            </Data>
            <Data name="Ulica">
              <value>MNICHY 12</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[DELIKATESY "AVENA PLUS" GRA??YNA ??WI??TEK]]></name>
          <address>64-100 LESZNO S??OWIA??SKA 20</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7820009713<br>Kod: 64-100<br>Miasto: LESZNO<br>Ulica: S??OWIA??SKA 20]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>S??OWIA??SKA 20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>B I A  BANASIAK SP????KA CYWILNASTOKROTKA SKLEP SPO??YWCZO PRZEMYS??OWY</name>
          <address>62-610 SOMPOLNO LUBST??WEK  47</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6652989997<br>Kod: 62-610<br>Miasto: SOMPOLNO<br>Ulica: LUBST??WEK  47]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>LUBST??WEK  47</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU  BEATA BORSKA</name>
          <address>62-003 BIEDRUSKO ZJEDNOCZENIA 12</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7791031229<br>Kod: 62-003<br>Miasto: BIEDRUSKO<br>Ulica: ZJEDNOCZENIA 12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>SKLEP SPO??YWCZO-PRZEMYS??OWY BINGO RENATA BLOCH</name>
          <address>64-140 BOSZKOWO DOMINICKA 40A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6981353987<br>Kod: 64-140<br>Miasto: BOSZKOWO<br>Ulica: DOMINICKA 40A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>SKLEP SPO??YWCZO-PRZEMYS??OWY BINGO RENATA BLOCH</name>
          <address>64-234 PRZEM??T JAGIELLO??SKA  13</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6981353987<br>Kod: 64-234<br>Miasto: PRZEM??T<br>Ulica: JAGIELLO??SKA  13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.981353987E9</value>
            </Data>
            <Data name="Kod">
              <value>64-234</value>
            </Data>
            <Data name="Miasto">
              <value>PRZEM??T</value>
            </Data>
            <Data name="Ulica">
              <value>JAGIELLO??SKA  13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPO??YWCZO-PRZEMYS??OWY "BINGO"  S.C. RENATA,CEZARY  BLOCH]]></name>
          <address>64-140 W??OSZAKOWICE LE??NA 1K</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6972310234<br>Kod: 64-140<br>Miasto: W??OSZAKOWICE<br>Ulica: LE??NA 1K]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.972310234E9</value>
            </Data>
            <Data name="Kod">
              <value>64-140</value>
            </Data>
            <Data name="Miasto">
              <value>W??OSZAKOWICE</value>
            </Data>
            <Data name="Ulica">
              <value>LE??NA 1K</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZY BO??ENA BORZYCH</name>
          <address>64-514 PRZEC??AW D??UGA 28</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7822207015<br>Kod: 64-514<br>Miasto: PRZEC??AW<br>Ulica: D??UGA 28]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822207015E9</value>
            </Data>
            <Data name="Kod">
              <value>64-514</value>
            </Data>
            <Data name="Miasto">
              <value>PRZEC??AW</value>
            </Data>
            <Data name="Ulica">
              <value>D??UGA 28</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZY BO??ENA BORZYCH</name>
          <address>64-514 PAMI??TKOWO SZKOLNA 15</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7822207015<br>Kod: 64-514<br>Miasto: PAMI??TKOWO<br>Ulica: SZKOLNA 15]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822207015E9</value>
            </Data>
            <Data name="Kod">
              <value>64-514</value>
            </Data>
            <Data name="Miasto">
              <value>PAMI??TKOWO</value>
            </Data>
            <Data name="Ulica">
              <value>SZKOLNA 15</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZY BO??ENA BORZYCH</name>
          <address>64-500 ??MI??OWO SPACEROWA 71 B</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7822207015<br>Kod: 64-500<br>Miasto: ??MI??OWO<br>Ulica: SPACEROWA 71 B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822207015E9</value>
            </Data>
            <Data name="Kod">
              <value>64-500</value>
            </Data>
            <Data name="Miasto">
              <value>??MI??OWO</value>
            </Data>
            <Data name="Ulica">
              <value>SPACEROWA 71 B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H.U. CARMEN ??UKASZ KUBIAK</name>
          <address>62-700 TUREK KALISKA 28</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6681729419<br>Kod: 62-700<br>Miasto: TUREK<br>Ulica: KALISKA 28]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>P.H.U. CARMEN ??UKASZ KUBIAK</name>
          <address>99-210 UNIEJ??W KO??CIELNICKA 140</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6681729419<br>Kod: 99-210<br>Miasto: UNIEJ??W<br>Ulica: KO??CIELNICKA 140]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.681729419E9</value>
            </Data>
            <Data name="Kod">
              <value>99-210</value>
            </Data>
            <Data name="Miasto">
              <value>UNIEJ??W</value>
            </Data>
            <Data name="Ulica">
              <value>KO??CIELNICKA 140</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H.U. CARMEN ??UKASZ KUBIAK</name>
          <address>62-700 TUREK OSIEDLE WYZWOLENIA 11 A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6681729419<br>Kod: 62-700<br>Miasto: TUREK<br>Ulica: OSIEDLE WYZWOLENIA 11 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>FIRMA HANDLOWO-US??UGOWAHURT-DETAL-GASTRONOMIA-US??UGI TURYSTYCZNE WITOLD CEGLAREK</name>
          <address>64-410 SIERAK??W ORLA  4</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7870004497<br>Kod: 64-410<br>Miasto: SIERAK??W<br>Ulica: ORLA  4]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870004497E9</value>
            </Data>
            <Data name="Kod">
              <value>64-410</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAK??W</value>
            </Data>
            <Data name="Ulica">
              <value>ORLA  4</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO-US??UGOWAHURT-DETAL-GASTRONOMIA-US??UGI TURYSTYCZNE WITOLD CEGLAREK</name>
          <address>64-410 SIERAK??W S??ONECZNA 9</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7870004497<br>Kod: 64-410<br>Miasto: SIERAK??W<br>Ulica: S??ONECZNA 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870004497E9</value>
            </Data>
            <Data name="Kod">
              <value>64-410</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAK??W</value>
            </Data>
            <Data name="Ulica">
              <value>S??ONECZNA 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>CENTRUM HANDLOWE BARBARA ORZE??</name>
          <address>64-610 ROGO??NO POLNA 18</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7660013320<br>Kod: 64-610<br>Miasto: ROGO??NO<br>Ulica: POLNA 18]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.66001332E9</value>
            </Data>
            <Data name="Kod">
              <value>64-610</value>
            </Data>
            <Data name="Miasto">
              <value>ROGO??NO</value>
            </Data>
            <Data name="Ulica">
              <value>POLNA 18</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>??UKASZ STARCZAK  CHATA SWOJSKA</name>
          <address>64-610 ROGO??NO WIELKA POZNA??SKA  38</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7661710512<br>Kod: 64-610<br>Miasto: ROGO??NO<br>Ulica: WIELKA POZNA??SKA  38]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661710512E9</value>
            </Data>
            <Data name="Kod">
              <value>64-610</value>
            </Data>
            <Data name="Miasto">
              <value>ROGO??NO</value>
            </Data>
            <Data name="Ulica">
              <value>WIELKA POZNA??SKA  38</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELMAS MI??OSZ ZACHARYASZ  SP.K.</name>
          <address>60-501 POZNA?? J. KRASZEWSKIEGO  5</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7811973243<br>Kod: 60-501<br>Miasto: POZNA??<br>Ulica: J. KRASZEWSKIEGO  5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.811973243E9</value>
            </Data>
            <Data name="Kod">
              <value>60-501</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>J. KRASZEWSKIEGO  5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELMAS MI??OSZ ZACHARYASZ  SP.K.</name>
          <address>60-501 POZNA?? LITERACKA 34</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7811973243<br>Kod: 60-501<br>Miasto: POZNA??<br>Ulica: LITERACKA 34]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.811973243E9</value>
            </Data>
            <Data name="Kod">
              <value>60-501</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>LITERACKA 34</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO-MONOPOLOWY MAGDALENA DOBROSZ</name>
          <address>63-830 P??POWO POWSTA??C??W WLKP. 15</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6961399532<br>Kod: 63-830<br>Miasto: P??POWO<br>Ulica: POWSTA??C??W WLKP. 15]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.961399532E9</value>
            </Data>
            <Data name="Kod">
              <value>63-830</value>
            </Data>
            <Data name="Miasto">
              <value>P??POWO</value>
            </Data>
            <Data name="Ulica">
              <value>POWSTA??C??W WLKP. 15</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GRZEGORZ DOLATA</name>
          <address>61-672 POZNA?? WICHROWE WZG??RZE, PAWILON 101</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7822167379<br>Kod: 61-672<br>Miasto: POZNA??<br>Ulica: WICHROWE WZG??RZE, PAWILON 101]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822167379E9</value>
            </Data>
            <Data name="Kod">
              <value>61-672</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>WICHROWE WZG??RZE, PAWILON 101</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MINI MARKET??.NOWAKOWSKI  K.NOWICKI  SP????KA JAWNA</name>
          <address>63-012 DOMINOWO CENTRALNA 13</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7861698827<br>Kod: 63-012<br>Miasto: DOMINOWO<br>Ulica: CENTRALNA 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>AWZ SKLEP WIELOBRANZOWY ZDZIS??AW DRO??D??</name>
          <address>61-312 POZNA?? SKIBOWA  9 A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7821177973<br>Kod: 61-312<br>Miasto: POZNA??<br>Ulica: SKIBOWA  9 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.821177973E9</value>
            </Data>
            <Data name="Kod">
              <value>61-312</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>SKIBOWA  9 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["DUKAT" SKLEP OG??LNOSPO??YWCZY SP.C.SKROBA??SKA M., SKROBA??SKI T.]]></name>
          <address>61-501 POZNA?? D??BR??WKI 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7831456083<br>Kod: 61-501<br>Miasto: POZNA??<br>Ulica: D??BR??WKI 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.831456083E9</value>
            </Data>
            <Data name="Kod">
              <value>61-501</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>D??BR??WKI 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DZIEWI??CKI  MIROS??AW SKLEP SPO??YWCZO- PRZEMYS??OWY</name>
          <address>63-520 GRAB??W N/PROSN?? W??ADYS??AWA JAGIE????Y 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 5140108763<br>Kod: 63-520<br>Miasto: GRAB??W N/PROSN??<br>Ulica: W??ADYS??AWA JAGIE????Y 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.140108763E9</value>
            </Data>
            <Data name="Kod">
              <value>63-520</value>
            </Data>
            <Data name="Miasto">
              <value>GRAB??W N/PROSN??</value>
            </Data>
            <Data name="Ulica">
              <value>W??ADYS??AWA JAGIE????Y 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DZIEWI??CKI  MIROS??AW SKLEP SPO??YWCZO- PRZEMYS??OWY</name>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 5140108763<br>Kod: 63-505<br>Miasto: DORUCH??W<br>Ulica: PRZYTOCZNICA  LOK 20]]></description>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.140108763E9</value>
            </Data>
            <Data name="Kod">
              <value>63-505</value>
            </Data>
            <Data name="Miasto">
              <value>DORUCH??W</value>
            </Data>
            <Data name="Ulica">
              <value>PRZYTOCZNICA  LOK 20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWO US??UGOWE  "ELIZA"  P.PIELUCHA A. MAKOWSKA SP????KA JAWNA]]></name>
          <address>64-530 KA??MIERZ JANA  PAW??A  II  26</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7871888311<br>Kod: 64-530<br>Miasto: KA??MIERZ<br>Ulica: JANA  PAW??A  II  26]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.871888311E9</value>
            </Data>
            <Data name="Kod">
              <value>64-530</value>
            </Data>
            <Data name="Miasto">
              <value>KA??MIERZ</value>
            </Data>
            <Data name="Ulica">
              <value>JANA  PAW??A  II  26</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP WIELOBRAN??OWY "GROSIK"MACIEJ SPITALNIAK]]></name>
          <address>62-028 KOZIEG??OWY POZNA??SKA 15C</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7771141386<br>Kod: 62-028<br>Miasto: KOZIEG??OWY<br>Ulica: POZNA??SKA 15C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.771141386E9</value>
            </Data>
            <Data name="Kod">
              <value>62-028</value>
            </Data>
            <Data name="Miasto">
              <value>KOZIEG??OWY</value>
            </Data>
            <Data name="Ulica">
              <value>POZNA??SKA 15C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GRUPA KM LASKOWSCYSP????KA JAWNA</name>
          <address>64-550 DUSZNIKI POWSTA??C??W WLKP. 2</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7882031436<br>Kod: 64-550<br>Miasto: DUSZNIKI<br>Ulica: POWSTA??C??W WLKP. 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>POWSTA??C??W WLKP. 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GRUPA KM LASKOWSCYSP????KA JAWNA</name>
          <address>64-310 LW??WEK RYNEK 32</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7882031436<br>Kod: 64-310<br>Miasto: LW??WEK<br>Ulica: RYNEK 32]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.882031436E9</value>
            </Data>
            <Data name="Kod">
              <value>64-310</value>
            </Data>
            <Data name="Miasto">
              <value>LW??WEK</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 32</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GRUPA KM LASKOWSCYSP????KA JAWNA</name>
          <address>64-510 WRONKI NOWOWIEJSKA 72B</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7882031436<br>Kod: 64-510<br>Miasto: WRONKI<br>Ulica: NOWOWIEJSKA 72B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>62-004 CZERWONAK ul.GDY??SKA  120</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6181827159<br>Kod: 62-004<br>Miasto: CZERWONAK<br>Ulica: ul.GDY??SKA  120]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>ul.GDY??SKA  120</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO HANDLOWE  "GRZYL" ZBIGNIEW GRZYL]]></name>
          <address>64-510 WRONKI MICKIEWICZA  10</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7630002240<br>Kod: 64-510<br>Miasto: WRONKI<br>Ulica: MICKIEWICZA  10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA[GMINNA SP????DZIELNIA "SCH" W KORZENIEWIE SKLEP NR 13 DZIERZBIN]]></name>
          <address>62-831 KORZENIEW DZIERZBIN 78</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6180042137<br>Kod: 62-831<br>Miasto: KORZENIEW<br>Ulica: DZIERZBIN 78]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA[GMINNA SP????DZIELNIA "SCH" W KORZENIEWIW SKLEP NR 2KO??CIELEC]]></name>
          <address>62-831 KORZENIEW KO??CIELEC 13</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6180042137<br>Kod: 62-831<br>Miasto: KORZENIEW<br>Ulica: KO??CIELEC 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>KO??CIELEC 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP??LDZIELNIA "SCH" W KORZENIEWIE SKLEP NR 9W MYCIELINIE]]></name>
          <address>62-831 KORZENIEW MYCIELIN  22</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6180042137<br>Kod: 62-831<br>Miasto: KORZENIEW<br>Ulica: MYCIELIN  22]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA"W  PRZYGRODZICACH]]></name>
          <address>63-421 PRZYGODZICE WROC??AWSKA 3 ANTONIN</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6220005698<br>Kod: 63-421<br>Miasto: PRZYGODZICE<br>Ulica: WROC??AWSKA 3 ANTONIN]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>WROC??AWSKA 3 ANTONIN</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA"W  PRZYGRODZICACH]]></name>
          <address>63-421 PRZYGODZICE CHYNOWA 115 CHYNOWA</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6220005698<br>Kod: 63-421<br>Miasto: PRZYGODZICE<br>Ulica: CHYNOWA 115 CHYNOWA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>GMINNA SP????DZIELNIA SAMOPOMOC CH??OPSKA SKLEP NR 1 DELIKATESY</name>
          <address>63-505 DORUCH??W OSTRZESZOWSKA 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6220105402<br>Kod: 63-505<br>Miasto: DORUCH??W<br>Ulica: OSTRZESZOWSKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220105402E9</value>
            </Data>
            <Data name="Kod">
              <value>63-505</value>
            </Data>
            <Data name="Miasto">
              <value>DORUCH??W</value>
            </Data>
            <Data name="Ulica">
              <value>OSTRZESZOWSKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GMINNA SP????DZIELNIA SAMOPOMOC CH??OPSKA SKLEP NR 14DELIKATESY</name>
          <address>63-505 DORUCH??W OSTRZESZOWSKA 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6220105402<br>Kod: 63-505<br>Miasto: DORUCH??W<br>Ulica: OSTRZESZOWSKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220105402E9</value>
            </Data>
            <Data name="Kod">
              <value>63-505</value>
            </Data>
            <Data name="Miasto">
              <value>DORUCH??W</value>
            </Data>
            <Data name="Ulica">
              <value>OSTRZESZOWSKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA"]]></name>
          <address>62-872 GODZIESZE WIELKIE MAJA  24</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6180042172<br>Kod: 62-872<br>Miasto: GODZIESZE WIELKIE<br>Ulica: MAJA  24]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA[GS K??RNIK "TECZA"]]></name>
          <address>61-061 K??RNIK PL.NIEPODLEGLOSCI 15</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7850002236<br>Kod: 61-061<br>Miasto: K??RNIK<br>Ulica: PL.NIEPODLEGLOSCI 15]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.850002236E9</value>
            </Data>
            <Data name="Kod">
              <value>61-061</value>
            </Data>
            <Data name="Miasto">
              <value>K??RNIK</value>
            </Data>
            <Data name="Ulica">
              <value>PL.NIEPODLEGLOSCI 15</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAMOPOMOC CH??OPSKA GS MI??DZYCH??D</name>
          <address>64-400 MI??DZYCH??D GEN. SIKORSKIEGO 16</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 5950000098<br>Kod: 64-400<br>Miasto: MI??DZYCH??D<br>Ulica: GEN. SIKORSKIEGO 16]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.950000098E9</value>
            </Data>
            <Data name="Kod">
              <value>64-400</value>
            </Data>
            <Data name="Miasto">
              <value>MI??DZYCH??D</value>
            </Data>
            <Data name="Ulica">
              <value>GEN. SIKORSKIEGO 16</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAMOPOMOC CH??OPSKA GS MI??DZYCH??DSKLEP  NR 8</name>
          <address>64-400 MI??DZYCH??D BIELSKO, UL. KWIATOWA 13</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 5950000098<br>Kod: 64-400<br>Miasto: MI??DZYCH??D<br>Ulica: BIELSKO, UL. KWIATOWA 13]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.950000098E9</value>
            </Data>
            <Data name="Kod">
              <value>64-400</value>
            </Data>
            <Data name="Miasto">
              <value>MI??DZYCH??D</value>
            </Data>
            <Data name="Ulica">
              <value>BIELSKO, UL. KWIATOWA 13</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAMOPOMOC CH??OPSKA GS MI??DZYCH??DSKLEP  NR 8</name>
          <address>64-426 ??OWY?? MI??DZYCHODZKA 2</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 5950000098<br>Kod: 64-426<br>Miasto: ??OWY??<br>Ulica: MI??DZYCHODZKA 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.950000098E9</value>
            </Data>
            <Data name="Kod">
              <value>64-426</value>
            </Data>
            <Data name="Miasto">
              <value>??OWY??</value>
            </Data>
            <Data name="Ulica">
              <value>MI??DZYCHODZKA 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA" W ODOLANOWIE]]></name>
          <address>63-430 BONIK??W D??UGA 22</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6220109067<br>Kod: 63-430<br>Miasto: BONIK??W<br>Ulica: D??UGA 22]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220109067E9</value>
            </Data>
            <Data name="Kod">
              <value>63-430</value>
            </Data>
            <Data name="Miasto">
              <value>BONIK??W</value>
            </Data>
            <Data name="Ulica">
              <value>D??UGA 22</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA" W ODOLANOWIE]]></name>
          <address>63-435 GRANOWIEC ODOLANOWSKA 29</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6220109067<br>Kod: 63-435<br>Miasto: GRANOWIEC<br>Ulica: ODOLANOWSKA 29]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA" W ODOLANOWIE]]></name>
          <address>63-430 ??WIECA ??WIECA 34</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6220109067<br>Kod: 63-430<br>Miasto: ??WIECA<br>Ulica: ??WIECA 34]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220109067E9</value>
            </Data>
            <Data name="Kod">
              <value>63-430</value>
            </Data>
            <Data name="Miasto">
              <value>??WIECA</value>
            </Data>
            <Data name="Ulica">
              <value>??WIECA 34</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA" W ODOLANOWIE]]></name>
          <address>63-430 TARCHA??Y WIELKIE STRA??ACKA 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6220109067<br>Kod: 63-430<br>Miasto: TARCHA??Y WIELKIE<br>Ulica: STRA??ACKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.220109067E9</value>
            </Data>
            <Data name="Kod">
              <value>63-430</value>
            </Data>
            <Data name="Miasto">
              <value>TARCHA??Y WIELKIE</value>
            </Data>
            <Data name="Ulica">
              <value>STRA??ACKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA  SP??LDZIELNIA"SAMOPOMOC  CH??OPSKA"]]></name>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7870000223<br>Kod: 62-400<br>Miasto: SIERAK??W<br>Ulica: G??RA 45]]></description>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870000223E9</value>
            </Data>
            <Data name="Kod">
              <value>62-400</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAK??W</value>
            </Data>
            <Data name="Ulica">
              <value>G??RA 45</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA" SZCZYTNIKI Z SIEDZIB?? W RADLICZYCACH]]></name>
          <address>62-865 SZCZYTNIKI LOKAL 31</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6180042226<br>Kod: 62-865<br>Miasto: SZCZYTNIKI<br>Ulica: LOKAL 31]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA[GMINNA SP????DZIELNIA "SAMOPOMOC CH??OPSKA" SZCZYTNIKI Z SIEDZIB?? W RADLICZYCACH]]></name>
          <address>62-865 SZCZYTNIKI RADLICZYCE  46</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6180042226<br>Kod: 62-865<br>Miasto: SZCZYTNIKI<br>Ulica: RADLICZYCE  46]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>IS NAVI TORR SP????KA Z OGRANICZON?? ODPOWIEDZIALNO??CI??</name>
          <address>62-090 ROKIETNICA TRAKT NAPOLEO??SKI 11</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7773105986<br>Kod: 62-090<br>Miasto: ROKIETNICA<br>Ulica: TRAKT NAPOLEO??SKI 11]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>TRAKT NAPOLEO??SKI 11</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[CUKIERNIA "JAG??DKA" KRZYSZTOF MOHO??]]></name>
          <address>60-682 POZNA?? OS BOLES??AWA ??MIA??EGO 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7780043163<br>Kod: 60-682<br>Miasto: POZNA??<br>Ulica: OS BOLES??AWA ??MIA??EGO 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.780043163E9</value>
            </Data>
            <Data name="Kod">
              <value>60-682</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>OS BOLES??AWA ??MIA??EGO 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO-US??UGOWA JANKOWSKI ??UKASZ</name>
          <address>62-306 GRABOWO KR??LEWSKIE GRABOWO KR??LEWSKIE 13/2</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7891633933<br>Kod: 62-306<br>Miasto: GRABOWO KR??LEWSKIE<br>Ulica: GRABOWO KR??LEWSKIE 13/2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.891633933E9</value>
            </Data>
            <Data name="Kod">
              <value>62-306</value>
            </Data>
            <Data name="Miasto">
              <value>GRABOWO KR??LEWSKIE</value>
            </Data>
            <Data name="Ulica">
              <value>GRABOWO KR??LEWSKIE 13/2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO-US??UGOWA JANKOWSKI ??UKASZ</name>
          <address>62-323 CHWALIBOGOWO CHWALIBOGOWO  19/1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7891633933<br>Kod: 62-323<br>Miasto: CHWALIBOGOWO<br>Ulica: CHWALIBOGOWO  19/1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>FIRMA HANDLOWO-US??UGOWA JANKOWSKI ??UKASZ</name>
          <address>62-300 PSARYPOLSKIE PSARY POLSKIE 126</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7891633933<br>Kod: 62-300<br>Miasto: PSARYPOLSKIE<br>Ulica: PSARY POLSKIE 126]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>63-440 RASZK??W RYNEK 28</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6221037720<br>Kod: 63-440<br>Miasto: RASZK??W<br>Ulica: RYNEK 28]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.22103772E9</value>
            </Data>
            <Data name="Kod">
              <value>63-440</value>
            </Data>
            <Data name="Miasto">
              <value>RASZK??W</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 28</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPHU "JEDYNKA" S.C. ANNA MA??KOWSKA,MARCIN MA??KOWSKI]]></name>
          <address>64-300 NOWY TOMY??L PL. F. CHOPINA 8</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7881835339<br>Kod: 64-300<br>Miasto: NOWY TOMY??L<br>Ulica: PL. F. CHOPINA 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.881835339E9</value>
            </Data>
            <Data name="Kod">
              <value>64-300</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY TOMY??L</value>
            </Data>
            <Data name="Ulica">
              <value>PL. F. CHOPINA 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWA MARCIN JEZIERSKI</name>
          <address>64-610 ROGO??NO WOJSKA POLSKIEGO  46</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6060023137<br>Kod: 64-610<br>Miasto: ROGO??NO<br>Ulica: WOJSKA POLSKIEGO  46]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.060023137E9</value>
            </Data>
            <Data name="Kod">
              <value>64-610</value>
            </Data>
            <Data name="Miasto">
              <value>ROGO??NO</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA POLSKIEGO  46</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNOSPO??YWCZY JULIUSZ J??DRZEJCZAK</name>
          <address>64-840 BUDZY?? PRZEMYS??OWA  10 A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7661041206<br>Kod: 64-840<br>Miasto: BUDZY??<br>Ulica: PRZEMYS??OWA  10 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661041206E9</value>
            </Data>
            <Data name="Kod">
              <value>64-840</value>
            </Data>
            <Data name="Miasto">
              <value>BUDZY??</value>
            </Data>
            <Data name="Ulica">
              <value>PRZEMYS??OWA  10 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNOSPO??YWCZY KAROLINA J??DRZEJCZAK</name>
          <address>64-830 MARGONIN KO??CIELNA 9</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7661903659<br>Kod: 64-830<br>Miasto: MARGONIN<br>Ulica: KO??CIELNA 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>KO??CIELNA 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNOSPO??YWCZY MARZANNA J??DRZEJCZAK</name>
          <address>62-100 W??GROWIEC JE??YKA  48</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7661196989<br>Kod: 62-100<br>Miasto: W??GROWIEC<br>Ulica: JE??YKA  48]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661196989E9</value>
            </Data>
            <Data name="Kod">
              <value>62-100</value>
            </Data>
            <Data name="Miasto">
              <value>W??GROWIEC</value>
            </Data>
            <Data name="Ulica">
              <value>JE??YKA  48</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNOSPO??YWCZY MARZANNA J??DRZEJCZAK</name>
          <address>64-510 WRONKI MICKIEWICZA  75</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7661196989<br>Kod: 64-510<br>Miasto: WRONKI<br>Ulica: MICKIEWICZA  75]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>SKLEP OG??LNOSPO??YWCZY JULIUSZ J??DRZEJCZAK</name>
          <address>62-100 W??GROWIEC ??W. WOJCIECHA 17</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7661041206<br>Kod: 62-100<br>Miasto: W??GROWIEC<br>Ulica: ??W. WOJCIECHA 17]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661041206E9</value>
            </Data>
            <Data name="Kod">
              <value>62-100</value>
            </Data>
            <Data name="Miasto">
              <value>W??GROWIEC</value>
            </Data>
            <Data name="Ulica">
              <value>??W. WOJCIECHA 17</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNOSPO??YWCZY JULIUSZ J??DRZEJCZAK</name>
          <address>64-700 CZARNK??W SIKORSKIEGO  2</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7661041206<br>Kod: 64-700<br>Miasto: CZARNK??W<br>Ulica: SIKORSKIEGO  2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661041206E9</value>
            </Data>
            <Data name="Kod">
              <value>64-700</value>
            </Data>
            <Data name="Miasto">
              <value>CZARNK??W</value>
            </Data>
            <Data name="Ulica">
              <value>SIKORSKIEGO  2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNOSPO??YWCZY JULIUSZ J??DRZEJCZAK</name>
          <address>62-100 W??GROWIEC 11 LISTOPADA 3</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7661041206<br>Kod: 62-100<br>Miasto: W??GROWIEC<br>Ulica: 11 LISTOPADA 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.661041206E9</value>
            </Data>
            <Data name="Kod">
              <value>62-100</value>
            </Data>
            <Data name="Miasto">
              <value>W??GROWIEC</value>
            </Data>
            <Data name="Ulica">
              <value>11 LISTOPADA 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO PRODUKCYJNO HANDLOWO US??UGOWE KAJA  SP????KA JAWNA KRYSTYNA PAWLIKOWSKA, PAULINA KLIM</name>
          <address>61-215 POZNA?? OS.POWST.NARODOWYCH 33</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7822226828<br>Kod: 61-215<br>Miasto: POZNA??<br>Ulica: OS.POWST.NARODOWYCH 33]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.822226828E9</value>
            </Data>
            <Data name="Kod">
              <value>61-215</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>OS.POWST.NARODOWYCH 33</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY KAJMAK</name>
          <address>61-314 POZNA?? MICHA??OWO 27</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7842497370<br>Kod: 61-314<br>Miasto: POZNA??<br>Ulica: MICHA??OWO 27]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.84249737E9</value>
            </Data>
            <Data name="Kod">
              <value>61-314</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>MICHA??OWO 27</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DOM HANDLOWY KAROLINKA ROMAN B??ASZAK</name>
          <address>64-932 STARA ??UBIANKA PARKOWA 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7651140415<br>Kod: 64-932<br>Miasto: STARA ??UBIANKA<br>Ulica: PARKOWA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.651140415E9</value>
            </Data>
            <Data name="Kod">
              <value>64-932</value>
            </Data>
            <Data name="Miasto">
              <value>STARA ??UBIANKA</value>
            </Data>
            <Data name="Ulica">
              <value>PARKOWA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HANDLOWE ZACISZE ANNA KASZTELAN</name>
          <address>64-980 TRZCIANKA OSIEDLE ZACISZE 12</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7631407364<br>Kod: 64-980<br>Miasto: TRZCIANKA<br>Ulica: OSIEDLE ZACISZE 12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA[PRZEDSI??BIORSTWO PRODUKCYJNO HANDLOWE "KASZTELAN" SPO??KA Z OGRANICZON?? ODPOWIEDZIALNO??CI??]]></name>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6681934177<br>Kod: 62-700<br>Miasto: W??ADYS??AW??W<br>Ulica: CHYLIN  W LOKALU 86C]]></description>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.681934177E9</value>
            </Data>
            <Data name="Kod">
              <value>62-700</value>
            </Data>
            <Data name="Miasto">
              <value>W??ADYS??AW??W</value>
            </Data>
            <Data name="Ulica">
              <value>CHYLIN  W LOKALU 86C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KO??ODZIEJCZAK BOGDANSKLEP SPO??YWCZO - PRZEMYS??OWY</name>
          <address>62-571 STARE MIASTO BARCZYG????W, UL. GRODZIECKA 61</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-571<br>Miasto: STARE MIASTO<br>Ulica: BARCZYG????W, UL. GRODZIECKA 61]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>BARCZYG????W, UL. GRODZIECKA 61</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KO??ODZIEJCZAK BOGDANSKLEP SPO??YWCZO - PRZEMYS??OWY</name>
          <address>62-500 KONIN PI??SUDSKIEGO 16 A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-500<br>Miasto: KONIN<br>Ulica: PI??SUDSKIEGO 16 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>PI??SUDSKIEGO 16 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KO??ODZIEJCZAK BOGDANSKLEP SPO??YWCZO - PRZEMYS??OWY</name>
          <address>62-512 BRZE??NO KONI??SKA  18</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-512<br>Miasto: BRZE??NO<br>Ulica: KONI??SKA  18]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.650019409E9</value>
            </Data>
            <Data name="Kod">
              <value>62-512</value>
            </Data>
            <Data name="Miasto">
              <value>BRZE??NO</value>
            </Data>
            <Data name="Ulica">
              <value>KONI??SKA  18</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KO??ODZIEJCZAK BOGDANSKLEP SPO??YWCZO - PRZEMYS??OWY</name>
          <address>62-500 KONIN PLAC G??RNIKA 4</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-500<br>Miasto: KONIN<br>Ulica: PLAC G??RNIKA 4]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>PLAC G??RNIKA 4</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KO??ODZIEJCZAK BOGDANSKLEP SPO??YWCZO -  PRZEMYS??OWY</name>
          <address>62-571 KR??GOLA STRA??ACKA  22</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-571<br>Miasto: KR??GOLA<br>Ulica: STRA??ACKA  22]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.650019409E9</value>
            </Data>
            <Data name="Kod">
              <value>62-571</value>
            </Data>
            <Data name="Miasto">
              <value>KR??GOLA</value>
            </Data>
            <Data name="Ulica">
              <value>STRA??ACKA  22</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KLAXO KO??ODZIEJCZAK BOGDANSKLEP SPO??YWCZO - PRZEMYS??OWY</name>
          <address>62-510 KONIN NOWOWIEJSKIEGO 1  A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6650019409<br>Kod: 62-510<br>Miasto: KONIN<br>Ulica: NOWOWIEJSKIEGO 1  A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>HANDEL MARCIN KO??TONIAK</name>
          <address>63-112 BRODNICA GRZYBNO 41</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7851665602<br>Kod: 63-112<br>Miasto: BRODNICA<br>Ulica: GRZYBNO 41]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>HANDEL MARCIN KO??TONIAK</name>
          <address>64-000 OBORZYSKA STARE KOLEJOWA 3</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7851665602<br>Kod: 64-000<br>Miasto: OBORZYSKA STARE<br>Ulica: KOLEJOWA 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA["KONTRA" PRZEDSI??BIORSTWO HANDLOWO-US??UGOWE PAWE?? KACZMAREK, PIOTR KACZMAREK SP????KA JAWNA]]></name>
          <address>60-185 SK??RZEWO POZNA??SKA 74</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7790021068<br>Kod: 60-185<br>Miasto: SK??RZEWO<br>Ulica: POZNA??SKA 74]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.790021068E9</value>
            </Data>
            <Data name="Kod">
              <value>60-185</value>
            </Data>
            <Data name="Miasto">
              <value>SK??RZEWO</value>
            </Data>
            <Data name="Ulica">
              <value>POZNA??SKA 74</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["KONTRA" PRZEDSI??BIORSTWO HANDLOWO-US??UGOWE PAWE?? KACZMAREK, PIOTR KACZMAREK SP????KA JAWNA]]></name>
          <address>60-185 SK??RZEWO BRATNIA 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7790021068<br>Kod: 60-185<br>Miasto: SK??RZEWO<br>Ulica: BRATNIA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.790021068E9</value>
            </Data>
            <Data name="Kod">
              <value>60-185</value>
            </Data>
            <Data name="Miasto">
              <value>SK??RZEWO</value>
            </Data>
            <Data name="Ulica">
              <value>BRATNIA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["KONTRA" PRZEDSI??BIORSTWO HANDLOWO US??UGOWE PAWE?? KACZMAREK, PIOTR KACZMAREK SP????KA JAWNA]]></name>
          <address>62-081 PRZE??MIEROWO RYNKOWA 142/144</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7790021068<br>Kod: 62-081<br>Miasto: PRZE??MIEROWO<br>Ulica: RYNKOWA 142/144]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.790021068E9</value>
            </Data>
            <Data name="Kod">
              <value>62-081</value>
            </Data>
            <Data name="Miasto">
              <value>PRZE??MIEROWO</value>
            </Data>
            <Data name="Ulica">
              <value>RYNKOWA 142/144</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["KONTRA" PRZEDSI??BIORSTWO HANDLOWO-US??UGOWE PAWE?? KACZMAREK, PIOTR KACZMAREK SP????KA JAWNA]]></name>
          <address>62-069 D??BROWA SZAFIROWA 1 A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7790021068<br>Kod: 62-069<br>Miasto: D??BROWA<br>Ulica: SZAFIROWA 1 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.790021068E9</value>
            </Data>
            <Data name="Kod">
              <value>62-069</value>
            </Data>
            <Data name="Miasto">
              <value>D??BROWA</value>
            </Data>
            <Data name="Ulica">
              <value>SZAFIROWA 1 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU EWA KRUK</name>
          <address>62-080 RUMIANEK SZKOLNA 97/5</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7771782607<br>Kod: 62-080<br>Miasto: RUMIANEK<br>Ulica: SZKOLNA 97/5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>PRZEDSI??BIORSTWO HANDLOWO - US??UGOWO - PRODUKCYJNE KRZY??Y??SKI MACIEJ</name>
          <address>64-110 ??WI??CIECHOWA RYNEK 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6971516028<br>Kod: 64-110<br>Miasto: ??WI??CIECHOWA<br>Ulica: RYNEK 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.971516028E9</value>
            </Data>
            <Data name="Kod">
              <value>64-110</value>
            </Data>
            <Data name="Miasto">
              <value>??WI??CIECHOWA</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO HANDLOWO - US??UGOWO -PRODUKCYJNE KRZY??Y??SKI MACIEJ</name>
          <address>64-113 ??WIERCZYNA ??WIERCZYNA 100F</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6971516028<br>Kod: 64-113<br>Miasto: ??WIERCZYNA<br>Ulica: ??WIERCZYNA 100F]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.971516028E9</value>
            </Data>
            <Data name="Kod">
              <value>64-113</value>
            </Data>
            <Data name="Miasto">
              <value>??WIERCZYNA</value>
            </Data>
            <Data name="Ulica">
              <value>??WIERCZYNA 100F</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNOSPO??YWCZY EWA KUJAWA-MISCH</name>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7881687011<br>Kod: 64-300<br>Miasto: NOWY TOMY??L<br>Ulica: 3-GO STYCZNIA 6]]></description>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.881687011E9</value>
            </Data>
            <Data name="Kod">
              <value>64-300</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY TOMY??L</value>
            </Data>
            <Data name="Ulica">
              <value>3-GO STYCZNIA 6</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>HURT-DETAL ART.SPO??YWCZYMI I PRZEMYS??OWYMI SP.C.H. MAJCHRZAK M.D. KU??MA</name>
          <address>63-100 ??REM NOCHOWO  UL.??REMSKA 10</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7850005559<br>Kod: 63-100<br>Miasto: ??REM<br>Ulica: NOCHOWO  UL.??REMSKA 10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.850005559E9</value>
            </Data>
            <Data name="Kod">
              <value>63-100</value>
            </Data>
            <Data name="Miasto">
              <value>??REM</value>
            </Data>
            <Data name="Ulica">
              <value>NOCHOWO  UL.??REMSKA 10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>K.M. LASKOWSCY S.C.</name>
          <address>64-316 KU??LIN E.SCZANIECKIEJ 23 MICHORZEWO</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7882001004<br>Kod: 64-316<br>Miasto: KU??LIN<br>Ulica: E.SCZANIECKIEJ 23 MICHORZEWO]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.882001004E9</value>
            </Data>
            <Data name="Kod">
              <value>64-316</value>
            </Data>
            <Data name="Miasto">
              <value>KU??LIN</value>
            </Data>
            <Data name="Ulica">
              <value>E.SCZANIECKIEJ 23 MICHORZEWO</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>K.M LASKOWSCY S.C.</name>
          <address>64-316 KU??LIN E. SZCZANIECKIEJ 14 A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7882001004<br>Kod: 64-316<br>Miasto: KU??LIN<br>Ulica: E. SZCZANIECKIEJ 14 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.882001004E9</value>
            </Data>
            <Data name="Kod">
              <value>64-316</value>
            </Data>
            <Data name="Miasto">
              <value>KU??LIN</value>
            </Data>
            <Data name="Ulica">
              <value>E. SZCZANIECKIEJ 14 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MARIUSZ LASKOWSKI</name>
          <address>64-305 BOLEWICE NOWA 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7881168989<br>Kod: 64-305<br>Miasto: BOLEWICE<br>Ulica: NOWA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA[CUKIERNIA-PIEKARNIA "??AWICA"  S.C.DANUTA I TAMARA BRIA??SKA]]></name>
          <address>60-189 POZNA?? Z??OTOWSKA 45</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7791577299<br>Kod: 60-189<br>Miasto: POZNA??<br>Ulica: Z??OTOWSKA 45]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.791577299E9</value>
            </Data>
            <Data name="Kod">
              <value>60-189</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>Z??OTOWSKA 45</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWA US??UGI, PRODUKCJA KICAL ILONA</name>
          <address>64-500 SZAMOTU??Y ALEJA 1  MAJA 32</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7871969771<br>Kod: 64-500<br>Miasto: SZAMOTU??Y<br>Ulica: ALEJA 1  MAJA 32]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.871969771E9</value>
            </Data>
            <Data name="Kod">
              <value>64-500</value>
            </Data>
            <Data name="Miasto">
              <value>SZAMOTU??Y</value>
            </Data>
            <Data name="Ulica">
              <value>ALEJA 1  MAJA 32</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWA ANNA ??USIEWICZ</name>
          <address>64-500 SZAMOTU??Y SP????DZIELCZA 1A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7870005025<br>Kod: 64-500<br>Miasto: SZAMOTU??Y<br>Ulica: SP????DZIELCZA 1A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870005025E9</value>
            </Data>
            <Data name="Kod">
              <value>64-500</value>
            </Data>
            <Data name="Miasto">
              <value>SZAMOTU??Y</value>
            </Data>
            <Data name="Ulica">
              <value>SP????DZIELCZA 1A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GOOD TASTE   ROBERT MACHNICKI</name>
          <address>62-081 PRZE??MIEROWO RYNKOWA 75 C</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 9720885675<br>Kod: 62-081<br>Miasto: PRZE??MIEROWO<br>Ulica: RYNKOWA 75 C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>9.720885675E9</value>
            </Data>
            <Data name="Kod">
              <value>62-081</value>
            </Data>
            <Data name="Miasto">
              <value>PRZE??MIEROWO</value>
            </Data>
            <Data name="Ulica">
              <value>RYNKOWA 75 C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZY EWA MA??CZAK</name>
          <address>62-820 STAWISZYN SZOSA  PLESZEWSKA 2A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 9680002763<br>Kod: 62-820<br>Miasto: STAWISZYN<br>Ulica: SZOSA  PLESZEWSKA 2A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>PPHU MA??KOWSCY S.A.MICHA?? MA??KOWSKI  HANNA MA??KOWSKA</name>
          <address>64-300 NOWY TOMY??L OS.BATOREGO  53</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7880022315<br>Kod: 64-300<br>Miasto: NOWY TOMY??L<br>Ulica: OS.BATOREGO  53]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.880022315E9</value>
            </Data>
            <Data name="Kod">
              <value>64-300</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY TOMY??L</value>
            </Data>
            <Data name="Ulica">
              <value>OS.BATOREGO  53</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MADO MAGDALENA DOLATA</name>
          <address>61-031 POZNA?? WARSZAWSKA 93</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7891540048<br>Kod: 61-031<br>Miasto: POZNA??<br>Ulica: WARSZAWSKA 93]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.891540048E9</value>
            </Data>
            <Data name="Kod">
              <value>61-031</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>WARSZAWSKA 93</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO - PRZEMYS??OWY MATEUSZ MAGDZIAREK</name>
          <address>63-421 PRZYGODZICE OSTROWSKA 13 D??BNICA</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6172065336<br>Kod: 63-421<br>Miasto: PRZYGODZICE<br>Ulica: OSTROWSKA 13 D??BNICA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>OSTROWSKA 13 D??BNICA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MAGDZIAREK ANDRZEJ SKLEP SPO??YWCZY</name>
          <address>63-330 DOBRZYCA R????ANA 7</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6211005687<br>Kod: 63-330<br>Miasto: DOBRZYCA<br>Ulica: R????ANA 7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>R????ANA 7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MAGDZIAREK ANDRZEJ SKLEP SPO??YWCZY</name>
          <address>63-300 PLESZEW KO??CIELNA 4, KOWALEW</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6211005687<br>Kod: 63-300<br>Miasto: PLESZEW<br>Ulica: KO??CIELNA 4, KOWALEW]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>KO??CIELNA 4, KOWALEW</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO - PRZEMYS??OWY MATEUSZ MAGDZIAREK</name>
          <address>63-330 DOBRZYCA SO??NICA  33 A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6172065336<br>Kod: 63-330<br>Miasto: DOBRZYCA<br>Ulica: SO??NICA  33 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>SO??NICA  33 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO - PRZEMYS??OWY MATEUSZ MAGDZIAREK</name>
          <address>63-230 WITASZYCE KOLEJOWA 19</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6172065336<br>Kod: 63-230<br>Miasto: WITASZYCE<br>Ulica: KOLEJOWA 19]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>SKLEP SPO??YWCZO - PRZEMYS??OWY MATEUSZ MAGDZIAREK</name>
          <address>63-400 OSTR??W WIELKOPOLSKI MELCHIORA  WA??KOWICZA 7</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6172065336<br>Kod: 63-400<br>Miasto: OSTR??W WIELKOPOLSKI<br>Ulica: MELCHIORA  WA??KOWICZA 7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.172065336E9</value>
            </Data>
            <Data name="Kod">
              <value>63-400</value>
            </Data>
            <Data name="Miasto">
              <value>OSTR??W WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>MELCHIORA  WA??KOWICZA 7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO - PRZEMYS??OWY MATEUSZ MAGDZIAREK</name>
          <address>63-400 OSTR??W WIELKOPOLSKI B.LIMANOWSKIEGO 69</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6172065336<br>Kod: 63-400<br>Miasto: OSTR??W WIELKOPOLSKI<br>Ulica: B.LIMANOWSKIEGO 69]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.172065336E9</value>
            </Data>
            <Data name="Kod">
              <value>63-400</value>
            </Data>
            <Data name="Miasto">
              <value>OSTR??W WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>B.LIMANOWSKIEGO 69</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H. MAJA PLUS  S.C.MA??GORZTA I JACEK GA????ZKA</name>
          <address>62-530 KAZIMIERZ BISKUPI JOD??OWA 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6652572122<br>Kod: 62-530<br>Miasto: KAZIMIERZ BISKUPI<br>Ulica: JOD??OWA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>JOD??OWA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H. MAJA PLUS  S.C.MA??GORZTA I JACEK GA????ZKA</name>
          <address>62-530 KAZIMIERZ BISKUPI GOLI??SKA 1A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6652572122<br>Kod: 62-530<br>Miasto: KAZIMIERZ BISKUPI<br>Ulica: GOLI??SKA 1A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>GOLI??SKA 1A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.H. MAJA PLUS  S.C.MA??GORZTA I JACEK GA????ZKA</name>
          <address>62-402 OSTROWITE LIPOWA  3 B</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6652572122<br>Kod: 62-402<br>Miasto: OSTROWITE<br>Ulica: LIPOWA  3 B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA["MA??GO" MA??GORZATA WYRWA??]]></name>
          <address>62-023 ROBAKOWO OSIEDLE TYGRYSIE 26 A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7791426301<br>Kod: 62-023<br>Miasto: ROBAKOWO<br>Ulica: OSIEDLE TYGRYSIE 26 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>MARCIN MA??CZAK SKLEP SPO??YWCZO-PRZEMYS??OWY</name>
          <address>64-308 JAB??ONNA KO??CIELNA  31A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6971568309<br>Kod: 64-308<br>Miasto: JAB??ONNA<br>Ulica: KO??CIELNA  31A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.971568309E9</value>
            </Data>
            <Data name="Kod">
              <value>64-308</value>
            </Data>
            <Data name="Miasto">
              <value>JAB??ONNA</value>
            </Data>
            <Data name="Ulica">
              <value>KO??CIELNA  31A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MARCIN MA??CZAK SKLEP SPO??YWCZO-PRZEMYS??OWY</name>
          <address>64-111 LIPNO POWSTA??C??W WLKP.5</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6971568309<br>Kod: 64-111<br>Miasto: LIPNO<br>Ulica: POWSTA??C??W WLKP.5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>POWSTA??C??W WLKP.5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>STACJA PALIW  SKLEP SPO??YWCZO-PRZEMYS??OWY URSZULA MARCINIAK</name>
          <address>62-874 BRZEZINY SOBIES??KI 7</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 9680661968<br>Kod: 62-874<br>Miasto: BRZEZINY<br>Ulica: SOBIES??KI 7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>SOBIES??KI 7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>WYROBY TRADYCYJNE I LOKALNE JOANNA MARCINIEC</name>
          <address>62-586 RZG??W OSIECZA PIERWSZA 23</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6652916159<br>Kod: 62-586<br>Miasto: RZG??W<br>Ulica: OSIECZA PIERWSZA 23]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.652916159E9</value>
            </Data>
            <Data name="Kod">
              <value>62-586</value>
            </Data>
            <Data name="Miasto">
              <value>RZG??W</value>
            </Data>
            <Data name="Ulica">
              <value>OSIECZA PIERWSZA 23</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRAN??OWY IZABELA MATUSZEWSKA</name>
          <address>62-035 K??RNIK POZNA??SKA 77</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7851102566<br>Kod: 62-035<br>Miasto: K??RNIK<br>Ulica: POZNA??SKA 77]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.851102566E9</value>
            </Data>
            <Data name="Kod">
              <value>62-035</value>
            </Data>
            <Data name="Miasto">
              <value>K??RNIK</value>
            </Data>
            <Data name="Ulica">
              <value>POZNA??SKA 77</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["MELBA" SP????KA JAWNADARIUSZ PRZYNOGA, EL??BIETA PRZYNOGA]]></name>
          <address>62-060 ST??SZEW POZNA??SKA 19 A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7771026219<br>Kod: 62-060<br>Miasto: ST??SZEW<br>Ulica: POZNA??SKA 19 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.771026219E9</value>
            </Data>
            <Data name="Kod">
              <value>62-060</value>
            </Data>
            <Data name="Miasto">
              <value>ST??SZEW</value>
            </Data>
            <Data name="Ulica">
              <value>POZNA??SKA 19 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA MICHA??OWSKI HENRYK MICHA??OWSKI SP????KA JAWNA MARKET IRENA</name>
          <address>62-045 PNIEWY PROMIENISTA 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7871803668<br>Kod: 62-045<br>Miasto: PNIEWY<br>Ulica: PROMIENISTA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>FIRMA MICHA??OWSKI HENRYK MICHA??OWSKI SP????KA JAWNA MARKET IRENA</name>
          <address>64-410 SIERAK??W PRZEDSZKOLNA 29</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7871803668<br>Kod: 64-410<br>Miasto: SIERAK??W<br>Ulica: PRZEDSZKOLNA 29]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.871803668E9</value>
            </Data>
            <Data name="Kod">
              <value>64-410</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAK??W</value>
            </Data>
            <Data name="Ulica">
              <value>PRZEDSZKOLNA 29</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA MICHA??OWSKI HENRYK MICHA??OWSKI SP????KA JAWNA MARKET IRENA</name>
          <address>62-045 PNIEWY STRZELECKA  32</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7871803668<br>Kod: 62-045<br>Miasto: PNIEWY<br>Ulica: STRZELECKA  32]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>PHU MILKA-1MA??GORZATA GO??CINIAK</name>
          <address>62-200 GNIEZNO ROOSEVELTA  116</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7840020770<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: ROOSEVELTA  116]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>62-061 B??DLEWO WIEJSKA 47</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7773220380<br>Kod: 62-061<br>Miasto: B??DLEWO<br>Ulica: WIEJSKA 47]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.77322038E9</value>
            </Data>
            <Data name="Kod">
              <value>62-061</value>
            </Data>
            <Data name="Miasto">
              <value>B??DLEWO</value>
            </Data>
            <Data name="Ulica">
              <value>WIEJSKA 47</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MTJ - GROUP MARIA JABCZY??SKA</name>
          <address>64-100 LESZNO GABRIELA   NARUTOWICZA  74</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6971682181<br>Kod: 64-100<br>Miasto: LESZNO<br>Ulica: GABRIELA   NARUTOWICZA  74]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA[MARCZY??SKI JAROS??AW "NETTO-MAR" FIRMA HANDLOWA]]></name>
          <address>64-800 CHODZIE?? BUCZKOWSKA 5</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7641053034<br>Kod: 64-800<br>Miasto: CHODZIE??<br>Ulica: BUCZKOWSKA 5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.641053034E9</value>
            </Data>
            <Data name="Kod">
              <value>64-800</value>
            </Data>
            <Data name="Miasto">
              <value>CHODZIE??</value>
            </Data>
            <Data name="Ulica">
              <value>BUCZKOWSKA 5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[MARCZY??SKI JAROS??AW "NETTO-MAR" FIRMA HANDLOWA]]></name>
          <address>64-850 UJ??CIE WOJSKA POLSKIEGO 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7641053034<br>Kod: 64-850<br>Miasto: UJ??CIE<br>Ulica: WOJSKA POLSKIEGO 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.641053034E9</value>
            </Data>
            <Data name="Kod">
              <value>64-850</value>
            </Data>
            <Data name="Miasto">
              <value>UJ??CIE</value>
            </Data>
            <Data name="Ulica">
              <value>WOJSKA POLSKIEGO 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZY NOCULAK SP????KA JAWNA</name>
          <address>63-604 BARAN??W RYNEK 14</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6190009880<br>Kod: 63-604<br>Miasto: BARAN??W<br>Ulica: RYNEK 14]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.19000988E9</value>
            </Data>
            <Data name="Kod">
              <value>63-604</value>
            </Data>
            <Data name="Miasto">
              <value>BARAN??W</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK 14</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZY  NOCULAK SP????KA JAWNA</name>
          <address>63-600 K??PNO RYNEK  7</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6190009880<br>Kod: 63-600<br>Miasto: K??PNO<br>Ulica: RYNEK  7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.19000988E9</value>
            </Data>
            <Data name="Kod">
              <value>63-600</value>
            </Data>
            <Data name="Miasto">
              <value>K??PNO</value>
            </Data>
            <Data name="Ulica">
              <value>RYNEK  7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOZYWCZY  NOCULAK SP????KA JAWNA</name>
          <address>56-500 SYC??W PLAC WOLNO??CI  6</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6190009880<br>Kod: 56-500<br>Miasto: SYC??W<br>Ulica: PLAC WOLNO??CI  6]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.19000988E9</value>
            </Data>
            <Data name="Kod">
              <value>56-500</value>
            </Data>
            <Data name="Miasto">
              <value>SYC??W</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC WOLNO??CI  6</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PIEKARNIA-CUKIERNIA KRZYSZTOF I LESZEK NOWACZYK SP????KA JAWNA</name>
          <address>62-070 DOPIEWO M??Y??SKA 9</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7771001946<br>Kod: 62-070<br>Miasto: DOPIEWO<br>Ulica: M??Y??SKA 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>M??Y??SKA 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO-W??DLINIARSKI ZBIGNIEW OLEKSY</name>
          <address>63-300 PLESZEW WOJSKA  POLSKIEGO 28</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6171020018<br>Kod: 63-300<br>Miasto: PLESZEW<br>Ulica: WOJSKA  POLSKIEGO 28]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>DELIKATESY OG??LNOSPO??YWCZE EDYTA OSTROWSKA</name>
          <address>61-611 POZNA?? NARAMOWICKA 232/BO??YDARA</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 9720869529<br>Kod: 61-611<br>Miasto: POZNA??<br>Ulica: NARAMOWICKA 232/BO??YDARA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>9.720869529E9</value>
            </Data>
            <Data name="Kod">
              <value>61-611</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>NARAMOWICKA 232/BO??YDARA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO HANDLOWO US??UGOWE MAREK OSTROWSKI</name>
          <address>61-611 POZNA?? NARAMOWICKA 170</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 9720421533<br>Kod: 61-611<br>Miasto: POZNA??<br>Ulica: NARAMOWICKA 170]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>9.720421533E9</value>
            </Data>
            <Data name="Kod">
              <value>61-611</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>NARAMOWICKA 170</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO US??UGOWA "PELIKAN" KRZYSZTOFTRZASKAWAKA]]></name>
          <address>88-300 MOGILNO DWORCOWA   7</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7841235165<br>Kod: 88-300<br>Miasto: MOGILNO<br>Ulica: DWORCOWA   7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>88-300 MOGILNO PI??SUDSKIEGO 23</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7841235165<br>Kod: 88-300<br>Miasto: MOGILNO<br>Ulica: PI??SUDSKIEGO 23]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>PI??SUDSKIEGO 23</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[FIRMA HANDLOWO - US??UGOWA "PIONIER"PIOTR NOWAK]]></name>
          <address>62-200 GNIEZNO WOLNO??CI  42 B</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7842032926<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: WOLNO??CI  42 B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>WOLNO??CI  42 B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA PRUSAK   DARIUSZ PRUSAK</name>
          <address>62-260 ??UBOWO ??UBOWO 85</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7841427663<br>Kod: 62-260<br>Miasto: ??UBOWO<br>Ulica: ??UBOWO 85]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.841427663E9</value>
            </Data>
            <Data name="Kod">
              <value>62-260</value>
            </Data>
            <Data name="Miasto">
              <value>??UBOWO</value>
            </Data>
            <Data name="Ulica">
              <value>??UBOWO 85</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[HURTOWA SP????DZIELNIA "SAMOPOMOC CH??OPSKA"]]></name>
          <address>62-310 PYZDRY WR??BCZYNEK</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6650001071<br>Kod: 62-310<br>Miasto: PYZDRY<br>Ulica: WR??BCZYNEK]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>WR??BCZYNEK</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO HANDLOWO US??UGOWE DEL-TRANS KRZYSZTOF SITEK</name>
          <address>64-420 KWILCZ POWSTA??C??W WLKP 1B</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 5961000191<br>Kod: 64-420<br>Miasto: KWILCZ<br>Ulica: POWSTA??C??W WLKP 1B]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>POWSTA??C??W WLKP 1B</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ZIELENIAK WIOLETTA SKIBIAK</name>
          <address>64-510 NOWA WIE?? SZAMOTULSKA 7</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7631257657<br>Kod: 64-510<br>Miasto: NOWA WIE??<br>Ulica: SZAMOTULSKA 7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.631257657E9</value>
            </Data>
            <Data name="Kod">
              <value>64-510</value>
            </Data>
            <Data name="Miasto">
              <value>NOWA WIE??</value>
            </Data>
            <Data name="Ulica">
              <value>SZAMOTULSKA 7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP S??ONECZKO DARIUSZ GULCZY??SKI</name>
          <address>62-200 GNIEZNO SIENKIEWICZA 13-15</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7841653170<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: SIENKIEWICZA 13-15]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>FIRMA HANDLOWA ANNA STACHOWIAK LESZEK STACHOWIAK SP????KA CYWILNA</name>
          <address>62-005 OWI??SKA PLAC PRZEMYS??AWA  1C</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7772878120<br>Kod: 62-005<br>Miasto: OWI??SKA<br>Ulica: PLAC PRZEMYS??AWA  1C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.77287812E9</value>
            </Data>
            <Data name="Kod">
              <value>62-005</value>
            </Data>
            <Data name="Miasto">
              <value>OWI??SKA</value>
            </Data>
            <Data name="Ulica">
              <value>PLAC PRZEMYS??AWA  1C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>P.W.  HAWA   GRA??YNA STACHOWIAK</name>
          <address>64-600 OBORNIKI DROGA LE??NA  25</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7871007061<br>Kod: 64-600<br>Miasto: OBORNIKI<br>Ulica: DROGA LE??NA  25]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>DROGA LE??NA  25</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FIRMA HANDLOWO-US??UGOWA KATARZYNA STROIW??S-OCHOWIAK</name>
          <address>62-023 BOR??WIEC POZNA??SKA 34</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7851435196<br>Kod: 62-023<br>Miasto: BOR??WIEC<br>Ulica: POZNA??SKA 34]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.851435196E9</value>
            </Data>
            <Data name="Kod">
              <value>62-023</value>
            </Data>
            <Data name="Miasto">
              <value>BOR??WIEC</value>
            </Data>
            <Data name="Ulica">
              <value>POZNA??SKA 34</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO-PRZEMYS??OWY ANDRZEJ SZA??A</name>
          <address>62-066 GRANOWO OGRODOWA 1A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7880010737<br>Kod: 62-066<br>Miasto: GRANOWO<br>Ulica: OGRODOWA 1A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>FIRMA HANDLOWO - US??UGOWA  SZPAK  MARIUSZ PARADOWSKI</name>
          <address>64-410 SIERAK??W WIELE??SKA 51</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 5951341424<br>Kod: 64-410<br>Miasto: SIERAK??W<br>Ulica: WIELE??SKA 51]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.951341424E9</value>
            </Data>
            <Data name="Kod">
              <value>64-410</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAK??W</value>
            </Data>
            <Data name="Ulica">
              <value>WIELE??SKA 51</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO PRODUKCYJNO-HANDLOWE IRENA SZUDA</name>
          <address>60-658 POZNA?? BONIN 8</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7790044767<br>Kod: 60-658<br>Miasto: POZNA??<br>Ulica: BONIN 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.790044767E9</value>
            </Data>
            <Data name="Kod">
              <value>60-658</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>BONIN 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KAROL SZUDA PRZEDSI??BIORSTWO HANDLOWE</name>
          <address>60-462 POZNA?? B????KITNA 1/7</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7772705052<br>Kod: 60-462<br>Miasto: POZNA??<br>Ulica: B????KITNA 1/7]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.772705052E9</value>
            </Data>
            <Data name="Kod">
              <value>60-462</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>B????KITNA 1/7</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PH ADAM SZUDA KAROL SZUDASP????KA CYWILNA</name>
          <address>60-462 POZNA?? SZARYCH SZEREG??W 12</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7811912307<br>Kod: 60-462<br>Miasto: POZNA??<br>Ulica: SZARYCH SZEREG??W 12]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.811912307E9</value>
            </Data>
            <Data name="Kod">
              <value>60-462</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>SZARYCH SZEREG??W 12</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO WIELOBRAN??OWE ANITA ??MIGIELSKA</name>
          <address>64-520 OBRZYCKO RYNEK 2</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7871068387<br>Kod: 64-520<br>Miasto: OBRZYCKO<br>Ulica: RYNEK 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>TAD-MARKET MICHA?? CIESI????KA</name>
          <address>61-294 POZNA?? OS. LECHA 43</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7631841215<br>Kod: 61-294<br>Miasto: POZNA??<br>Ulica: OS. LECHA 43]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.631841215E9</value>
            </Data>
            <Data name="Kod">
              <value>61-294</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>OS. LECHA 43</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["TALAREK"  TOMASZ STEPHAN]]></name>
          <address>62-200 GNIEZNO GRZYBOWO  17</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7841656903<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: GRZYBOWO  17]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>62-200 GNIEZNO OS ????KOWE 55 W????NICA</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7841656903<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: OS ????KOWE 55 W????NICA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>OS ????KOWE 55 W????NICA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["TALAREK"  TOMASZ STEPHAN]]></name>
          <address>62-200 GNIEZNO SIKORSIEGO 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7841656903<br>Kod: 62-200<br>Miasto: GNIEZNO<br>Ulica: SIKORSIEGO 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>TIM SP????KA CYWILNA  PRZEMYS??AW  KA??MIERCZAKKATARZYNA KA??MIERCZAK</name>
          <address>60-158 POZNA?? JANA KEPLERA  1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7792347822<br>Kod: 60-158<br>Miasto: POZNA??<br>Ulica: JANA KEPLERA  1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.792347822E9</value>
            </Data>
            <Data name="Kod">
              <value>60-158</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>JANA KEPLERA  1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO-PRZEMYS??OWY BEATA TOMCZAK</name>
          <address>63-130 KSI???? WILEKOPOLSKI CHRZ??STKOWO 46</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7851203793<br>Kod: 63-130<br>Miasto: KSI???? WILEKOPOLSKI<br>Ulica: CHRZ??STKOWO 46]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.851203793E9</value>
            </Data>
            <Data name="Kod">
              <value>63-130</value>
            </Data>
            <Data name="Miasto">
              <value>KSI???? WILEKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>CHRZ??STKOWO 46</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DELIKATESY CHATKA GRZEGORZ TOMCZAK</name>
          <address>63-004 TULCE GOWARZEWO, RABOWICKA 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7822115307<br>Kod: 63-004<br>Miasto: TULCE<br>Ulica: GOWARZEWO, RABOWICKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7822115307<br>Kod: 63-004<br>Miasto: TULCE<br>Ulica: GOWARZEWO, SIEKIERECKA 24B/1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name><![CDATA[FIRMA HANDLOWA "TOMI"TOMASZ ZIELI??SKI]]></name>
          <address>64-500 SZAMOTU??Y ZIELONA 72</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7870005404<br>Kod: 64-500<br>Miasto: SZAMOTU??Y<br>Ulica: ZIELONA 72]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870005404E9</value>
            </Data>
            <Data name="Kod">
              <value>64-500</value>
            </Data>
            <Data name="Miasto">
              <value>SZAMOTU??Y</value>
            </Data>
            <Data name="Ulica">
              <value>ZIELONA 72</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>TORO ROGER TROSZY??SKIBARBARA TROSZY??SKA  SP????KA CYWILNA</name>
          <address>63-020 ZANIEMY??L RACZY??SKIEGO 3</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7861700932<br>Kod: 63-020<br>Miasto: ZANIEMY??L<br>Ulica: RACZY??SKIEGO 3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.861700932E9</value>
            </Data>
            <Data name="Kod">
              <value>63-020</value>
            </Data>
            <Data name="Miasto">
              <value>ZANIEMY??L</value>
            </Data>
            <Data name="Ulica">
              <value>RACZY??SKIEGO 3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>TRANS MARKSP????KA Z OGRANICZON?? ODPOWIEDZIALNO??CI??</name>
          <address>61-329 POZNA?? G??USZYNA 273</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7811665843<br>Kod: 61-329<br>Miasto: POZNA??<br>Ulica: G??USZYNA 273]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.811665843E9</value>
            </Data>
            <Data name="Kod">
              <value>61-329</value>
            </Data>
            <Data name="Miasto">
              <value>POZNA??</value>
            </Data>
            <Data name="Ulica">
              <value>G??USZYNA 273</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[SKLEP SPO??YWCZO-PRZEMYS??OWY " U DOROTY" DOROTAGORCZY??SKA-AST]]></name>
          <address>64-600 OBORNIKI STANIS??AWA STASZICA 9</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7871162270<br>Kod: 64-600<br>Miasto: OBORNIKI<br>Ulica: STANIS??AWA STASZICA 9]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>STANIS??AWA STASZICA 9</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZY  U  LUSIJOANNA  NOWAKOWSKA-LUSSA</name>
          <address>63-000 BRODOWO POZNA??SKA  10</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7861682944<br>Kod: 63-000<br>Miasto: BRODOWO<br>Ulica: POZNA??SKA  10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>POZNA??SKA  10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRAN??OWY MATEUSZ URBA??SKI</name>
          <address>98-400 WIERUSZ??W KLEMENSA WIERUSZA 5</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 9970135751<br>Kod: 98-400<br>Miasto: WIERUSZ??W<br>Ulica: KLEMENSA WIERUSZA 5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>9.970135751E9</value>
            </Data>
            <Data name="Kod">
              <value>98-400</value>
            </Data>
            <Data name="Miasto">
              <value>WIERUSZ??W</value>
            </Data>
            <Data name="Ulica">
              <value>KLEMENSA WIERUSZA 5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["WALDI" ZAWIDZKI SP????KA JAWNAMARKET  SU??KOWSKI]]></name>
          <address>64-100 LESZNO SU??KOWSKIEGO 46</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6971002795<br>Kod: 64-100<br>Miasto: LESZNO<br>Ulica: SU??KOWSKIEGO 46]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>SU??KOWSKIEGO 46</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>JERZY WAWRZYNIAK</name>
          <address>63-400 OSTR??W WIELKOPOLSKI IN??YNIERSKA 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 8511053237<br>Kod: 63-400<br>Miasto: OSTR??W WIELKOPOLSKI<br>Ulica: IN??YNIERSKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>8.511053237E9</value>
            </Data>
            <Data name="Kod">
              <value>63-400</value>
            </Data>
            <Data name="Miasto">
              <value>OSTR??W WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>IN??YNIERSKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO WIELOBRAN??OWE "WEGA" JAROS??AW ZIMNY]]></name>
          <address>64-300 NOWY  TOMY??L OS. ST.BATOREGO  20</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7880005713<br>Kod: 64-300<br>Miasto: NOWY  TOMY??L<br>Ulica: OS. ST.BATOREGO  20]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.880005713E9</value>
            </Data>
            <Data name="Kod">
              <value>64-300</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY  TOMY??L</value>
            </Data>
            <Data name="Ulica">
              <value>OS. ST.BATOREGO  20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO WIELOBRAN??OWE "WEGA" JAROS??AW ZIMNY]]></name>
          <address>64-320 SZEWCE BUKOWSKA 111</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7880005713<br>Kod: 64-320<br>Miasto: SZEWCE<br>Ulica: BUKOWSKA 111]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>WIOLETTA WOJTCZAK SKLEP SPO??YWCZO PRZEMYS??OWY</name>
          <address>62-610 SOMPOLNO LUBST??WEK NR 57</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6652558719<br>Kod: 62-610<br>Miasto: SOMPOLNO<br>Ulica: LUBST??WEK NR 57]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>LUBST??WEK NR 57</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNOSPO??YWCZY SP????KA CYWILNA MAGDALENA WOJTY??, MA??GORZATA B??ASZCZYK</name>
          <address>62-322 ORZECHOWO SZKOLNA 3 CZESZEWO</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7891538726<br>Kod: 62-322<br>Miasto: ORZECHOWO<br>Ulica: SZKOLNA 3 CZESZEWO]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>SPOKOJNA -PARK WR??BLEWSCYSP????KA JAWNA</name>
          <address>63-900 RAWICZ SCZANIECKICH 1</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6991900132<br>Kod: 63-900<br>Miasto: RAWICZ<br>Ulica: SCZANIECKICH 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <address>64-610 ROGO??NO ZA JEZIOREM 2A</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6060000461<br>Kod: 64-610<br>Miasto: ROGO??NO<br>Ulica: ZA JEZIOREM 2A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.060000461E9</value>
            </Data>
            <Data name="Kod">
              <value>64-610</value>
            </Data>
            <Data name="Miasto">
              <value>ROGO??NO</value>
            </Data>
            <Data name="Ulica">
              <value>ZA JEZIOREM 2A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU MIKO??AJ MIKO??AJ ??AK SKLEP PRUSINOWO</name>
          <address>62-035 K??RNIK PRUSINOWO 6</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7851185434<br>Kod: 62-035<br>Miasto: K??RNIK<br>Ulica: PRUSINOWO 6]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.851185434E9</value>
            </Data>
            <Data name="Kod">
              <value>62-035</value>
            </Data>
            <Data name="Miasto">
              <value>K??RNIK</value>
            </Data>
            <Data name="Ulica">
              <value>PRUSINOWO 6</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FRIMA HANDOLOWO - US??UGOWAANMAR</name>
          <address>74-400 D??BNO OBORZANY</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 5971443731<br>Kod: 74-400<br>Miasto: D??BNO<br>Ulica: OBORZANY]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.971443731E9</value>
            </Data>
            <Data name="Kod">
              <value>74-400</value>
            </Data>
            <Data name="Miasto">
              <value>D??BNO</value>
            </Data>
            <Data name="Ulica">
              <value>OBORZANY</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>BABA-JAGA  KATARZYNA ORACZ</name>
          <address>74-106 KO??BACZ SZARYCH MNICH??W 11</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 9551357435<br>Kod: 74-106<br>Miasto: KO??BACZ<br>Ulica: SZARYCH MNICH??W 11]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>9.551357435E9</value>
            </Data>
            <Data name="Kod">
              <value>74-106</value>
            </Data>
            <Data name="Miasto">
              <value>KO??BACZ</value>
            </Data>
            <Data name="Ulica">
              <value>SZARYCH MNICH??W 11</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO - PRZEMYS??OWY SP????KA CYWILNA MARIAN BLATKIEWICZ, ALEKSANDRA JASICZAK</name>
          <address>66-433 LUBISZYN GORZOWSKA  3 A</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 5991416915<br>Kod: 66-433<br>Miasto: LUBISZYN<br>Ulica: GORZOWSKA  3 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>ADAM BORCZY??SKI</name>
          <address>66-432 BACZYNA GORZOWSKA 36</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 5991043408<br>Kod: 66-432<br>Miasto: BACZYNA<br>Ulica: GORZOWSKA 36]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>HANDEL ARTYKU??AMI SPO??YWCZO-PRZEMYS??OWYMI ??ANETA NOWOROLNIK</name>
          <address>74-520 CEDYNIA PU??ASKIEGO</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 8581036209<br>Kod: 74-520<br>Miasto: CEDYNIA<br>Ulica: PU??ASKIEGO]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>PU??ASKIEGO</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA["DELIKATESY" MA??GORZATA CZERNIKIEWICZ]]></name>
          <address>78-550 CZAPLINEK WA??ECKA 56</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 6741228886<br>Kod: 78-550<br>Miasto: CZAPLINEK<br>Ulica: WA??ECKA 56]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>WA??ECKA 56</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PRZEDSI??BIORSTWO PRODUKCYJNO HANDLOWO US??UGOWE DALMAR MARCIN DALECKI</name>
          <address>78-600 WA??CZ POGODNA 29 JEZIORKI</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 7651264554<br>Kod: 78-600<br>Miasto: WA??CZ<br>Ulica: POGODNA 29 JEZIORKI]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>7.651264554E9</value>
            </Data>
            <Data name="Kod">
              <value>78-600</value>
            </Data>
            <Data name="Miasto">
              <value>WA??CZ</value>
            </Data>
            <Data name="Ulica">
              <value>POGODNA 29 JEZIORKI</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FENIKS RADOS??AW DYMECKI</name>
          <address>66-400 GORZ??W  WIELKOPOLSKI KOMBATANT??W 2</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 5992331983<br>Kod: 66-400<br>Miasto: GORZ??W  WIELKOPOLSKI<br>Ulica: KOMBATANT??W 2]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.992331983E9</value>
            </Data>
            <Data name="Kod">
              <value>66-400</value>
            </Data>
            <Data name="Miasto">
              <value>GORZ??W  WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>KOMBATANT??W 2</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>FENIKS  RADOS??AW DYMECKI</name>
          <address>66-400 GORZ??W WIELKOPOLSKI PAPUSZY  5 A</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 5992331983<br>Kod: 66-400<br>Miasto: GORZ??W WIELKOPOLSKI<br>Ulica: PAPUSZY  5 A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.992331983E9</value>
            </Data>
            <Data name="Kod">
              <value>66-400</value>
            </Data>
            <Data name="Miasto">
              <value>GORZ??W WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>PAPUSZY  5 A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GROSIK SP????KA Z OGRANICZON?? ODPOWIEDZIALNO??CI?? SKLEP  JOKER 102</name>
          <address>63-300 MI??DZYRZECZ G??OWACKIEGO  1</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 9271929391<br>Kod: 63-300<br>Miasto: MI??DZYRZECZ<br>Ulica: G??OWACKIEGO  1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271929391E9</value>
            </Data>
            <Data name="Kod">
              <value>63-300</value>
            </Data>
            <Data name="Miasto">
              <value>MI??DZYRZECZ</value>
            </Data>
            <Data name="Ulica">
              <value>G??OWACKIEGO  1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>GROSIK SP????KA Z OGRANICZON?? ODPOWIEDZIALNO??CI?? SKLEP GROSIK 3</name>
          <address>66-300 BOBOWICKO/MI??DZYRZECZ MI??DZYRZECKA 1</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 9271929391<br>Kod: 66-300<br>Miasto: BOBOWICKO/MI??DZYRZECZ<br>Ulica: MI??DZYRZECKA 1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>9.271929391E9</value>
            </Data>
            <Data name="Kod">
              <value>66-300</value>
            </Data>
            <Data name="Miasto">
              <value>BOBOWICKO/MI??DZYRZECZ</value>
            </Data>
            <Data name="Ulica">
              <value>MI??DZYRZECKA 1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPOZYWCZO PRZEMYS??OWY PRZEMYS??AW JAWORSKI</name>
          <address>66-436 S??O??SK SIKORSKIEGO 42</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 4290023312<br>Kod: 66-436<br>Miasto: S??O??SK<br>Ulica: SIKORSKIEGO 42]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>4.290023312E9</value>
            </Data>
            <Data name="Kod">
              <value>66-436</value>
            </Data>
            <Data name="Miasto">
              <value>S??O??SK</value>
            </Data>
            <Data name="Ulica">
              <value>SIKORSKIEGO 42</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>MONIKA KOBUSIAK SKLEP SPOZYWCZO - PRZEMYS??OWY</name>
          <address>74-510 TRZCI??SKO ZDR??J KR??TKA  11</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 8581573976<br>Kod: 74-510<br>Miasto: TRZCI??SKO ZDR??J<br>Ulica: KR??TKA  11]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.581573976E9</value>
            </Data>
            <Data name="Kod">
              <value>74-510</value>
            </Data>
            <Data name="Miasto">
              <value>TRZCI??SKO ZDR??J</value>
            </Data>
            <Data name="Ulica">
              <value>KR??TKA  11</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[HANDEL ART. SPO??YWCZYMI I PRZEMYS??OWYMISKLEP "DELIKATESY" HURT I DETAL EL??BIETA KUJAWA]]></name>
          <address>72-400 KAMIE?? POMORSKI BA??TYCKA 1C</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 8610001031<br>Kod: 72-400<br>Miasto: KAMIE?? POMORSKI<br>Ulica: BA??TYCKA 1C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.610001031E9</value>
            </Data>
            <Data name="Kod">
              <value>72-400</value>
            </Data>
            <Data name="Miasto">
              <value>KAMIE?? POMORSKI</value>
            </Data>
            <Data name="Ulica">
              <value>BA??TYCKA 1C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>PHU MdM UDZIELA,UDZIELA SP????KA JAWNA</name>
          <address>69-110 RZEPIN RADOWSKA 27 KOWAL??W</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 5981597683<br>Kod: 69-110<br>Miasto: RZEPIN<br>Ulica: RADOWSKA 27 KOWAL??W]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
              <value>RADOWSKA 27 KOWAL??W</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>M.K.M. SP????KA CYWILNA MAGDALENA MIGA, MA??GORZATA MIGA</name>
          <address>78-449 BORNE SULINOWO SOSNOWA 5/3</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 6731660197<br>Kod: 78-449<br>Miasto: BORNE SULINOWO<br>Ulica: SOSNOWA 5/3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>HANDEL DETALICZNY ARTYKU??AMI SPO??YWCZO-PRZEMYS??OWYMI SP????KA JAWNA ZDZIS??AW WERAKSA, ANETA KIE??BASA</name>
          <address>74-400 D??BNO LUBUSKIE CHOJE??SKA 8</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 5971334315<br>Kod: 74-400<br>Miasto: D??BNO LUBUSKIE<br>Ulica: CHOJE??SKA 8]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.971334315E9</value>
            </Data>
            <Data name="Kod">
              <value>74-400</value>
            </Data>
            <Data name="Miasto">
              <value>D??BNO LUBUSKIE</value>
            </Data>
            <Data name="Ulica">
              <value>CHOJE??SKA 8</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO - PRZEMYS??OWY PIECIUL KRYSTYNA</name>
          <address>74-300 MY??LIB??RZ RATUSZOWA 10</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 5971332173<br>Kod: 74-300<br>Miasto: MY??LIB??RZ<br>Ulica: RATUSZOWA 10]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.971332173E9</value>
            </Data>
            <Data name="Kod">
              <value>74-300</value>
            </Data>
            <Data name="Miasto">
              <value>MY??LIB??RZ</value>
            </Data>
            <Data name="Ulica">
              <value>RATUSZOWA 10</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP CHATA POLSKA TERESA PIOTROWSKA</name>
          <address>66-400 GORZ??W WIELKOPOLSKI POZNA??SKA 101</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 5991217794<br>Kod: 66-400<br>Miasto: GORZ??W WIELKOPOLSKI<br>Ulica: POZNA??SKA 101]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>5.991217794E9</value>
            </Data>
            <Data name="Kod">
              <value>66-400</value>
            </Data>
            <Data name="Miasto">
              <value>GORZ??W WIELKOPOLSKI</value>
            </Data>
            <Data name="Ulica">
              <value>POZNA??SKA 101</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PPHU " U KACHNY " KATARZYNA BIL]]></name>
          <address>66-320 TRZCIEL SIERCZ 38</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 5961126868<br>Kod: 66-320<br>Miasto: TRZCIEL<br>Ulica: SIERCZ 38]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
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
          <name>F.H.U. LEGRA  GRA??YNA  ZAREMBA</name>
          <address>72-420 DZIWN??W OSIEDLE RYBACKIE  113A</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 8571238791<br>Kod: 72-420<br>Miasto: DZIWN??W<br>Ulica: OSIEDLE RYBACKIE  113A]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.571238791E9</value>
            </Data>
            <Data name="Kod">
              <value>72-420</value>
            </Data>
            <Data name="Miasto">
              <value>DZIWN??W</value>
            </Data>
            <Data name="Ulica">
              <value>OSIEDLE RYBACKIE  113A</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>ANNA ??EMOJTEL</name>
          <address>72-514 KO??CZEWO LE??NA 4  WISE??KA</address>
          <description><![CDATA[Wojew??dztwo: zachodniopomorskie<br>NIP: 8550002706<br>Kod: 72-514<br>Miasto: KO??CZEWO<br>Ulica: LE??NA 4  WISE??KA]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>zachodniopomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.550002706E9</value>
            </Data>
            <Data name="Kod">
              <value>72-514</value>
            </Data>
            <Data name="Miasto">
              <value>KO??CZEWO</value>
            </Data>
            <Data name="Ulica">
              <value>LE??NA 4  WISE??KA</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SAWA SAWICKI I SP????KA SP.J.SKLEP RZ??DZIK 2</name>
          <address>86-300 GRUDZI??DZ SOBIESKIEGO 5</address>
          <description><![CDATA[Wojew??dztwo: kujawsko-pomorskie<br>NIP: 8762467404<br>Kod: 86-300<br>Miasto: GRUDZI??DZ<br>Ulica: SOBIESKIEGO 5]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>kujawsko-pomorskie</value>
            </Data>
            <Data name="NIP">
              <value>8.762467404E9</value>
            </Data>
            <Data name="Kod">
              <value>86-300</value>
            </Data>
            <Data name="Miasto">
              <value>GRUDZI??DZ</value>
            </Data>
            <Data name="Ulica">
              <value>SOBIESKIEGO 5</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP WIELOBRAN??OWY ROMAN DYTKO I BOGUS??AW DYTKO SP????KA JAWNA MARKET</name>
          <address>67-120 KO??UCH??W 22 -LIPCA 1807/1</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9250012374<br>Kod: 67-120<br>Miasto: KO??UCH??W<br>Ulica: 22 -LIPCA 1807/1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.250012374E9</value>
            </Data>
            <Data name="Kod">
              <value>67-120</value>
            </Data>
            <Data name="Miasto">
              <value>KO??UCH??W</value>
            </Data>
            <Data name="Ulica">
              <value>22 -LIPCA 1807/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP SPO??YWCZO-PRZEMYS??OWY MA??A GASTRONOMIAANNA RYMARZ</name>
          <address>67-320 MA??OMICE LUBIECH??W 93/1</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9241493003<br>Kod: 67-320<br>Miasto: MA??OMICE<br>Ulica: LUBIECH??W 93/1]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.241493003E9</value>
            </Data>
            <Data name="Kod">
              <value>67-320</value>
            </Data>
            <Data name="Miasto">
              <value>MA??OMICE</value>
            </Data>
            <Data name="Ulica">
              <value>LUBIECH??W 93/1</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>KAMILA W??ODARCZAK SKLEP SPO??YWCZY</name>
          <address>67-312 NIEGOS??AWICE PRZEC??AW 302/3</address>
          <description><![CDATA[Wojew??dztwo: lubuskie<br>NIP: 9251965685<br>Kod: 67-312<br>Miasto: NIEGOS??AWICE<br>Ulica: PRZEC??AW 302/3]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>lubuskie</value>
            </Data>
            <Data name="NIP">
              <value>9.251965685E9</value>
            </Data>
            <Data name="Kod">
              <value>67-312</value>
            </Data>
            <Data name="Miasto">
              <value>NIEGOS??AWICE</value>
            </Data>
            <Data name="Ulica">
              <value>PRZEC??AW 302/3</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>DZIEWI??CKI MIROS??AW SKLEP SPO??YWCZO- PRZEMYS??OWY</name>
          <address>63-505 DORUCH??W PRZYTOCZNICA LOK 20</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 5140108763<br>Kod: 63-505<br>Miasto: DORUCH??W<br>Ulica: PRZYTOCZNICA LOK 20]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>5.140108763E9</value>
            </Data>
            <Data name="Kod">
              <value>63-505</value>
            </Data>
            <Data name="Miasto">
              <value>DORUCH??W</value>
            </Data>
            <Data name="Ulica">
              <value>PRZYTOCZNICA LOK 20</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[GMINNA SP??LDZIELNIA"SAMOPOMOC CH??OPSKA"]]></name>
          <address>62-400 SIERAK??W G??RA 45</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7870000223<br>Kod: 62-400<br>Miasto: SIERAK??W<br>Ulica: G??RA 45]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.870000223E9</value>
            </Data>
            <Data name="Kod">
              <value>62-400</value>
            </Data>
            <Data name="Miasto">
              <value>SIERAK??W</value>
            </Data>
            <Data name="Ulica">
              <value>G??RA 45</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name><![CDATA[PRZEDSI??BIORSTWO PRODUKCYJNO HANDLOWE "KASZTELAN" SPO??KA Z OGRANICZON?? ODPOWIEDZIALNO??CI??]]></name>
          <address>62-700 W??ADYS??AW??W CHYLIN W LOKALU 86C</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 6681934177<br>Kod: 62-700<br>Miasto: W??ADYS??AW??W<br>Ulica: CHYLIN W LOKALU 86C]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>6.681934177E9</value>
            </Data>
            <Data name="Kod">
              <value>62-700</value>
            </Data>
            <Data name="Miasto">
              <value>W??ADYS??AW??W</value>
            </Data>
            <Data name="Ulica">
              <value>CHYLIN W LOKALU 86C</value>
            </Data>
          </ExtendedData>
        </Placemark>
        <Placemark>
          <name>SKLEP OG??LNOSPO??YWCZY EWA KUJAWA-MISCH</name>
          <address>64-300 NOWY TOMY??L 3 STYCZNIA 6</address>
          <description><![CDATA[Wojew??dztwo: wielkopolskie<br>NIP: 7881687011<br>Kod: 64-300<br>Miasto: NOWY TOMY??L<br>Ulica: 3 STYCZNIA 6]]></description>
          <styleUrl>#icon-1899-0288D1</styleUrl>
          <ExtendedData>
            <Data name="Wojew??dztwo">
              <value>wielkopolskie</value>
            </Data>
            <Data name="NIP">
              <value>7.881687011E9</value>
            </Data>
            <Data name="Kod">
              <value>64-300</value>
            </Data>
            <Data name="Miasto">
              <value>NOWY TOMY??L</value>
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
    // //   "???? ~ file: uploadKML.js ~ line 32 ~ form.parse ~ converted",
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
