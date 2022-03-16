const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion, Payload } = require("dialogflow-fulfillment");
const router = express.Router();
const { getCovid } = require("../controller/linemessage");
router.get("/", async (req, res) => {
  const dataCovid = await getCovid();
  return res.status(200).json({
    status: true,
    data: dataCovid,
  });
});
router.post("/", (req, res) => {
  const agent = new WebhookClient({
    request: req,
    response: res,
  });
  async function welcome(agent) {
    try {
      console.log(
        "---------------------line welcome---------------------------"
      );
      const dataCovid = await getCovid();
      let payloadJson = {
        type: "flex",
        altText: "สถานะการณ์โควิด",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "สถานะการณ์โควิด",
                margin: "md",
                size: "xxl",
                style: "normal",
                weight: "regular",
                align: "start",
                gravity: "center",
                wrap: true,
                color: "#4ecdc4",
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "วันที่",
                    color: "#aaaaaa",
                  },
                  {
                    type: "text",
                    text: `${dataCovid.UpdateDate}`,
                    color: "#aaaaaa",
                  },
                ],
                spacing: "md",
                margin: "xl",
              },
              {
                type: "separator",
                margin: "xxl",
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ข้อมูลประจำวัน",
                    align: "center",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "ติดเชื้อ",
                      },
                      {
                        type: "text",
                        text: `${dataCovid.NewConfirmed}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "รักษาอยู่",
                      },
                      {
                        type: "text",
                        text: `${dataCovid.NewHospitalized}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "หายแล้ว",
                      },
                      {
                        type: "text",
                        text: `${dataCovid.NewRecovered}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "เสียชีวิต",
                      },
                      {
                        type: "text",
                        text: `${dataCovid.NewDeaths}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                ],
                spacing: "sm",
                margin: "xl",
              },
              {
                type: "separator",
                margin: "xxl",
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ข้อมูลสะสม",
                    align: "center",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "ติดเชื้อ",
                      },
                      {
                        type: "text",
                        text: `${dataCovid.Confirmed}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "รักษาอยู่",
                      },
                      {
                        type: "text",
                        text: `${dataCovid.Hospitalized}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "หายแล้ว",
                      },
                      {
                        type: "text",
                        text: `${dataCovid.Recovered}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "เสียชีวิต",
                      },
                      {
                        type: "text",
                        text: `${dataCovid.Deaths}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                ],
                spacing: "sm",
                margin: "xl",
              },
            ],
          },
        },
      };
      let payload = new Payload("LINE", payloadJson, {
        sendAsMessage: true,
      });
      agent.add(`Welcome to my agent!`);
      agent.add(payload);
    } catch (error) {
      console.error(error);
    }
  }
  async function covid19(agent) {
    try {
      console.log(
        "---------------------line welcome---------------------------"
      );
      const dataCovid = await getCovid();
      console.log(dataCovid);
      let payloadJson = {
        type: "flex",
        altText: "สถานะการณ์โควิด",
        contents: {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "สถานะการณ์โควิด",
                margin: "md",
                size: "xxl",
                style: "normal",
                weight: "regular",
                align: "start",
                gravity: "center",
                wrap: true,
                color: "#4ecdc4",
              },
              {
                type: "box",
                layout: "horizontal",
                contents: [
                  {
                    type: "text",
                    text: "วันที่",
                    color: "#aaaaaa",
                  },
                  {
                    type: "text",
                    text: `${dataCovid[0].update_date}`,
                    color: "#aaaaaa",
                  },
                ],
                spacing: "md",
                margin: "xl",
              },
              {
                type: "separator",
                margin: "xxl",
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ข้อมูลประจำวัน",
                    align: "center",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "ติดเชื้อ",
                      },
                      {
                        type: "text",
                        text: `${dataCovid[0].new_case}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "รักษาอยู่",
                      },
                      {
                        type: "text",
                        text: `${dataCovid[0].new_case_excludeabroad}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "หายแล้ว",
                      },
                      {
                        type: "text",
                        text: `${dataCovid[0].new_recovered}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "เสียชีวิต",
                      },
                      {
                        type: "text",
                        text: `${dataCovid[0].new_death}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                ],
                spacing: "sm",
                margin: "xl",
              },
              {
                type: "separator",
                margin: "xxl",
              },
              {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "ข้อมูลสะสม",
                    align: "center",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "ติดเชื้อ",
                      },
                      {
                        type: "text",
                        text: `${dataCovid[0].total_case}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "รักษาอยู่",
                      },
                      {
                        type: "text",
                        text: `${dataCovid[0].total_case_excludeabroad}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "หายแล้ว",
                      },
                      {
                        type: "text",
                        text: `${dataCovid[0].total_recovered}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        text: "เสียชีวิต",
                      },
                      {
                        type: "text",
                        text: `${dataCovid[0].total_death}`,
                        size: "sm",
                        align: "end",
                      },
                    ],
                  },
                ],
                spacing: "sm",
                margin: "xl",
              },
            ],
          },
        },
      };
      let payload = new Payload("LINE", payloadJson, {
        sendAsMessage: true,
      });
      agent.add(payload);
    } catch (error) {
      console.error(error);
    }
  }

  function bodyMassIndex(agent) {
    let weight = req.body.queryResult.parameters.weight;
    let height = req.body.queryResult.parameters.length / 100;
    let bmi = (weight / (height * height)).toFixed(2);

    let result = "none";
    let pkgId = "1";
    let stkId = "1";

    if (bmi < 18.5) {
      result =
        "คุณมีน้ำหนักน้อยหรือผอม โดยทั่วไป ค่าดัชนีมวลกายปกติมีค่าน้อยกว่า 18.50";
      pkgId = "11538";
      stkId = "51626519";
    } else if (bmi >= 18.5 && bmi < 23) {
      result =
        "คุณมี น้ำหนักปกติ โดยทั่วไปค่าดัชนีมวลกายปกติมีค่าระหว่าง 18.50 - 22.90";
      pkgId = "11537";
      stkId = "52002741";
    } else if (bmi >= 23 && bmi < 25) {
      result =
        "คุณมี น้ำหนักเกิน หรือรูปร่างท้วม โดยทั่วไปค่าดัชนีมวลกายปกติมีค่าระหว่าง 23 - 24.90";
      pkgId = "11537";
      stkId = "52002745";
    } else if (bmi >= 25 && bmi < 30) {
      result =
        "คุณ อ้วนแล้ว (อ้วนระดับ 2) โดยทั่วไปค่าดัชนีมวลกายปกติมีค่าระหว่าง 25 - 29.90";
      pkgId = "11537";
      stkId = "52002762";
    } else if (bmi >= 30) {
      result =
        "คุณ อ้วนแล้ว (อ้วนระดับ 3) โดยทั่วไปค่าดัชนีมวลกายปกติมีค่าระหว่าง 25 - 29.90";
      pkgId = "11538";
      stkId = "51626513";
    }
    let payloadJson = {
      type: "sticker",
      packageId: pkgId,
      stickerId: stkId,
    };
    let payload = new Payload("LINE", payloadJson, {
      sendAsMessage: true,
    });
    agent.add(`ค่า BMI ของคุณคือ ${bmi}`);
    agent.add(`${result}`);
    agent.add(payload);
  }
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Covid-19", covid19);
  intentMap.set("BMI - custom - yes", bodyMassIndex);
  agent.handleRequest(intentMap);
});
module.exports = router;
