import React, { useState } from "react";
import SydContext from "../context/SydContext.js";
import SideComponents from "./SideComponents.js";
import { useAppContext } from "./SideCommons.js";
import Collapsible from "../reusable/Collapsible.js";
import { tryFuncOr } from "../reusable/Funcs.js";
import "./SydSide.css";

//Исковое производство
function ActionProduction() {
  const ctx = useAppContext(SydContext, "syd");
  const table = [
    {
      id: 1,
      text: "Исковые заявления рассматриваются в Арбитражном суде региона",
    },
    {
      id: 2,
      text: "Сумма исковых требований: превышает 400 тысяч рублей",
    },
    {
      id: 3,
      text: "По делу проводятся судебные заседания",
    },
    {
      id: 4,
      text:
        "Решение суда является окончательным, вступает в силу по истечении" +
        "месяца со дня вынесения. Либо сразу после рассмотрения апелляционной " +
        "жалобы ответчика, если он обратиться с соответствующей жалобой.",
    },
  ];
  const tableProps = table.map((table) => (
    <li className="sydside-li"> {table.text}</li>
  ));

  return (
    <>
      <div className="sydside-split-text">
        <ul className="icon sydside-ul">{tableProps}</ul>
        <div className="sydside-app-tema">Подсудность</div>
        <SideComponents.RadioGroup value="value.radio_level_1" ctx={ctx}>
          <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />

          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 0}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />

          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 1}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите Адрес суда" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства истца" />

          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 2}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства Займодавца" />

          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 3}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите адрес жительства/нахождения займодавца:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />

          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 4}
            duration="0.1s"
          >
            <div className="sydside-app">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите адрес места исполнения договора:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
        </SideComponents.RadioGroup>
      </div>
    </>
  );
}
//упрощенное производство
function SimplifiedProduction() {
  const ctx = useAppContext(SydContext, "syd");
  const table = [
    {
      id: 1,
      text: "Сумма исковых требований не превышает для юр. лиц 800'000 рублей, 400'000 для ИП",
    },
    {
      id: 2,
      text: "В суд подаётся исковое заявление",
    },
    {
      id: 3,
      text: "По делу не проводятся судебные заседания",
    },
    {
      id: 4,
      text: "Исковые заявления рассматриваются в Арбитражном суде региона",
    },
    {
      id: 5,
      text:
        "Решение суда является окончательным, вступает в силу по истечении 15 дней со дня вынесения. " +
        +"Либо сразу после рассмотрения апелляционной жалобы ответчика, если он" +
        +"обратиться с соответствующей жалобой.",
    },
  ];
  const tableProps = table.map((table) => (
    <li className="sydside-li"> {table.text}</li>
  ));

  return (
    <>
      <div className="sydside-split-text">
        <ul className="icon sydside-ul">{tableProps}</ul>
        <div className="sydside-app-tema">Подсудность</div>
        <SideComponents.RadioGroup value="value.radio_level_1" ctx={ctx}>
          <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 0}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 1}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Укажите пункт договора, в котором содержится данное условие:" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 2}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 3}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input
                  type="text"
                  id="n"
                  placeholder="Введите пункт договора"
                />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите адрес места исполнения договора
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
        </SideComponents.RadioGroup>
      </div>
    </>
  );
}
//Приказное производство
function OrderProduction() {
  const ctx = useAppContext(SydContext, "syd");
  const table = [
    {
      id: 1,
      text: "Сумма исковых требований: не превышает 500'000 рублей ",
    },
    {
      id: 2,
      text: "Подаётся заявление о вынесении судебного приказа",
    },
    {
      id: 3,
      text: "Оплата госпошлины в размере 50%  от госпошлины по иску",
    },
    {
      id: 4,
      text: "Судебные заседания не проводится",
    },
    {
      id: 5,
      text: "Судебный приказ отменяется в случае подачи возражений должником после чего необходимо обращаться с исковым заявлением",
    },
  ];
  const tableProps = table.map((table) => (
    <li className="sydside-li"> {table.text}</li>
  ));

  return (
    <>
      <div className="sydside-split-text">
        <ul className="icon sydside-ul">{tableProps}</ul>
        <SideComponents.RadioGroup value="value.radio_level_2" ctx={ctx}>
          <SideComponents.RadioLabel text="Обратиться за вынесением судебного приказа" />
          <Collapsible
            shown={
              ctx.sideData.value.radio_level_2 === 0 ||
              ctx.sideData.value.radio_level_1 === 0 ||
              ctx.sideData.value.radio_level_1 === 1 ||
              ctx.sideData.value.radio_level_1 === 2 ||
              ctx.sideData.value.radio_level_1 === 3 ||
              ctx.sideData.value.radio_level_1 === 4
            }
            duration="0.1s"
          >
            <div class="sydside-app">
              <SideComponents.RadioGroup value="value.radio_level_1" ctx={ctx}>
                <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
                <Collapsible
                  shown={ctx.sideData.value.radio_level_1 === 0}
                  duration="0.1s"
                >
                  <div className="sydside-app ">
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Наименование суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите суд" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Адрес суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                  </div>
                </Collapsible>
                <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
                <Collapsible
                  shown={ctx.sideData.value.radio_level_1 === 1}
                  duration="0.1s"
                >
                  <div className="sydside-app ">
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите пункт договора, в котором содержится данное
                          условие:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Укажите пункт" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Введите наименование суда:
                        </label>
                      </div>
                      <input
                        type="text"
                        id="n"
                        placeholder="Введите наименование"
                      />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Адрес суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                  </div>
                </Collapsible>
                <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства истца" />
                <Collapsible
                  shown={ctx.sideData.value.radio_level_1 === 2}
                  duration="0.1s"
                >
                  <div className="sydside-app ">
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите пункт договора, в котором содержится данное
                          условие:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите пункт" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Введите наименование суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите суд" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Адрес суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                  </div>
                </Collapsible>
                <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства Займодавца" />
                <Collapsible
                  shown={ctx.sideData.value.radio_level_1 === 3}
                  duration="0.1s"
                >
                  <div className="sydside-app ">
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите пункт договора, в котором содержится данное
                          условие:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите пункт" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите адрес места жительства/нахождения займодавца:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Введите наименование суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите суд" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Адрес суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                  </div>
                </Collapsible>
                <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора." />
                <Collapsible
                  shown={ctx.sideData.value.radio_level_1 === 4}
                  duration="0.1s"
                >
                  <div className="sydside-app ">
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите пункт договора, в котором содержится данное
                          условие:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Укажите пункт" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите адрес места исполнения договора:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Введите наименование суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите суд" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Адрес суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                  </div>
                </Collapsible>
              </SideComponents.RadioGroup>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="У меня имеются письменные возражения заёмщика относительно спорной задолженности." />
          <Collapsible
            shown={ctx.sideData.value.radio_level_2 === 1}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Наименование документа
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите наименование" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Дата документа:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите дату" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel
            text="Я уже обращался с заявлением о вынесении судебного приказа, однако Арбитражный суд вынес 
                    определение  об отказе в принятии заявления о вынесении судебного приказа"
          />
          <Collapsible
            shown={ctx.sideData.value.radio_level_2 === 2}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите дату обращения с заявлением о вынесении судебного
                    приказа:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите дату" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите дату определеия об отменен судебного приказа:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите дату" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите номер дела из картотеки арбитражных дел:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите номер" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Я уже обращался с заявлением о вынесении судебного приказа, однако судебный приказ был отменён в связи с подачей возражений должника." />
          <Collapsible
            shown={ctx.sideData.value.radio_level_2 === 3}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите дату обращения с заявлением о вынесении судебного
                    приказа:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите дату" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите дату определеия об отменен судебного приказа:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите дату" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите номер дела из картотеки арбитражных дел:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите номер" />
              </div>
            </div>
          </Collapsible>
        </SideComponents.RadioGroup>
      </div>
    </>
  );
}
//Исковое производство у мировых судей
function ActionProductionJusties() {
  const ctx = useAppContext(SydContext, "syd");
  const table = [
    {
      id: 1,
      text: "Сумма исковых требований не превышает 50'000 рублей",
    },
    {
      id: 2,
      text: "В суд подааётся исковое заявление",
    },
    {
      id: 3,
      text: "По делу проводятся судебные заседания",
    },
    {
      id: 4,
      text: "Исковое заявление рассматривается мировым судьёй",
    },
    {
      id: 5,
      text:
        "Решение суда является окончательным, вступает в силу по истечении" +
        "месяца со дня вынесения. Либо сразу после рассмотрения апелляционной " +
        "жалобы ответчика, если он обратиться с соответствующей жалобой.",
    },
  ];
  const tableProps = table.map((table) => (
    <li className="sydside-li"> {table.text}</li>
  ));
  return (
    <>
      <div className="sydside-split-text">
        <ul className="icon sydside-ul">{tableProps}</ul>
        <div className="sydside-app-tema">Подсудность</div>
        <SideComponents.RadioGroup value="value.radio_level_1" ctx={ctx}>
          <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 0}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 1}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства истца" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 2}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder=" Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства Займодавца" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 3}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите адрес жительства/нахождения займодавца:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 4}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите адрес места исполнения договора
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
        </SideComponents.RadioGroup>
      </div>
    </>
  );
}
//Исковое производство в суде общей юрисдикции
function ActionProductionJurisdiction() {
  const ctx = useAppContext(SydContext, "syd");
  const table = [
    {
      id: 1,
      text: "Сумма исковых требований не превышает 500'000 рублей",
    },
    {
      id: 2,
      text: "В суд подааётся исковое заявление",
    },
    {
      id: 3,
      text: "По делу проводятся судебные заседания",
    },
    {
      id: 4,
      text: "Исковое заявление рассматривается в районном/городском суде",
    },
    {
      id: 5,
      text:
        "Решение суда является окончательным, вступает в силу по истечении" +
        "месяца со дня вынесения. Либо сразу после рассмотрения апелляционной " +
        "жалобы ответчика, если он обратиться с соответствующей жалобой.",
    },
  ];
  const tableProps = table.map((table) => (
    <li className="sydside-li"> {table.text}</li>
  ));
  return (
    <>
      <div className="sydside-split-text">
        <ul className="icon sydside-ul">{tableProps}</ul>
        <div className="sydside-app-tema">Подсудность</div>
        <SideComponents.RadioGroup value="value.radio_level_1" ctx={ctx}>
          <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 0}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 1}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства истца" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 2}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства Займодавца" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 3}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите адрес жительства/нахождения займодавца:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 4}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите адрес места исполнения договора
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
        </SideComponents.RadioGroup>
      </div>
    </>
  );
}

//Упрощенное производство в суде общей юрисдикции
function SimplifiedProductionJurisdiction() {
  const ctx = useAppContext(SydContext, "syd");
  const table = [
    {
      id: 1,
      text: "Сумма исковых требований не превышает 100'000 рублей",
    },
    {
      id: 2,
      text: "В суд подаётся исковое заявление",
    },
    {
      id: 3,
      text: "По делу не проводятся судебные заседания",
    },
    {
      id: 4,
      text: "Исковые заявления рассматриваются в районном/городском суде",
    },
    {
      id: 5,
      text:
        "Решение суда является окончательным, вступает в силу по истечении 15 дней со дня вынесения. " +
        +"Либо сразу после рассмотрения апелляционной жалобы ответчика, если он" +
        +"обратиться с соответствующей жалобой.",
    },
  ];
  const tableProps = table.map((table) => (
    <li className="sydside-li"> {table.text}</li>
  ));

  return (
    <>
      <div className="sydside-split-text">
        <ul className="icon sydside-ul">{tableProps}</ul>
        <div className="sydside-app-tema">Подсудность</div>
        <SideComponents.RadioGroup value="value.radio_level_1" ctx={ctx}>
          <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 0}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 1}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder=" Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указанно, что дело рассматривается по месту нахождения/жительства истца" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 2}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Указанно, что дело рассматривается по месту нахождения/жительства Займодавца" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 3}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />
          <Collapsible
            shown={ctx.sideData.value.radio_level_1 === 4}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите пункт" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите адрес места исполнения договора
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите наименование суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите суд" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Адрес суда:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите адрес" />
              </div>
            </div>
          </Collapsible>
        </SideComponents.RadioGroup>
      </div>
    </>
  );
}

//Приказное производство у мирового судьи
function OrderProductionJusties() {
  const ctx = useAppContext(SydContext, "syd");
  const table = [
    {
      id: 1,
      text: "Сумма исковых требований: не превышает 500'000 рублей ",
    },
    {
      id: 2,
      text: "Подаётся заявление о вынесении судебного приказа",
    },
    {
      id: 3,
      text: "Оплата госпошлины в размере 50%  от госпошлины по иску",
    },
    {
      id: 4,
      text: "Судебные заседания не проводится",
    },
    {
      id: 5,
      text: "Судебный приказ отменяется в случае подачи возражений должником после чего необходимо обращаться с исковым заявлением",
    },
  ];
  const tableProps = table.map((table) => (
    <li className="sydside-li"> {table.text}</li>
  ));

  return (
    <>
      <div className="sydside-split-text">
        <ul className="icon sydside-ul">{tableProps}</ul>
        <SideComponents.RadioGroup value="value.radio_level_2" ctx={ctx}>
          <SideComponents.RadioLabel text="Обратиться за вынесением судебного приказа" />
          <Collapsible
            shown={
              ctx.sideData.value.radio_level_1 === 0 ||
              ctx.sideData.value.radio_level_1 === 1 ||
              ctx.sideData.value.radio_level_1 === 2 ||
              ctx.sideData.value.radio_level_1 === 3 ||
              ctx.sideData.value.radio_level_1 === 4 ||
              ctx.sideData.value.radio_level_2 === 0
            }
            duration="0.1s"
          >
            <div class="sydside-app">
              <SideComponents.RadioGroup value="value.radio_level_1" ctx={ctx}>
                <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />

                <Collapsible
                  shown={ctx.sideData.value.radio_level_1 === 0}
                  duration="0.1s"
                >
                  <div className="sydside-app ">
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Наименование суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите суд" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Адрес суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                  </div>
                </Collapsible>
                <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
                <Collapsible
                  shown={ctx.sideData.value.radio_level_1 === 1}
                  duration="0.1s"
                >
                  <div className="sydside-app ">
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите пункт договора, в котором содержится данное
                          условие:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Укажите пункт" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Введите наименование суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите суд" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Адрес суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                  </div>
                </Collapsible>
                <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства истца" />
                <Collapsible
                  shown={ctx.sideData.value.radio_level_1 === 2}
                  duration="0.1s"
                >
                  <div className="sydside-app ">
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите пункт договора, в котором содержится данное
                          условие:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Укажите пункт" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Введите наименование суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите суд" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Адрес суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                  </div>
                </Collapsible>
                <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства Займодавца" />
                <Collapsible
                  shown={ctx.sideData.value.radio_level_1 === 3}
                  duration="0.1s"
                >
                  <div className="sydside-app ">
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите пункт договора, в котором содержится данное
                          условие:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Укажите пункт" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите адрес места жительства/нахождения займодавца:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Введите наименование суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите суд" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Адрес суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                  </div>
                </Collapsible>
                <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора." />
                <Collapsible
                  shown={ctx.sideData.value.radio_level_1 === 4}
                  duration="0.1s"
                >
                  <div className="sydside-app ">
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите пункт договора, в котором содержится данное
                          условие:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Укажите пункт" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Укажите адрес места исполнения договора:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Введите наименование суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите суд" />
                    </div>
                    <div className="sydside-app-radio-text">
                      <div className="sydside-app-radio-text-width">
                        <label class="sydside-label" for="n">
                          Адрес суда:
                        </label>
                      </div>
                      <input type="text" id="n" placeholder="Введите адрес" />
                    </div>
                  </div>
                </Collapsible>
              </SideComponents.RadioGroup>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="У меня имеются письменные возражения заёмщика относительно спорной задолженности." />
          <Collapsible
            shown={ctx.sideData.value.radio_level_2 === 1}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Наименование документа
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите наименование" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Дата документа:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите дату" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel
            text="Я уже обращался с заявлением о вынесении судебного приказа, однако Мировой судья вынес 
                    определение  об отказе в принятии заявления о вынесении судебного приказа"
          />
          <Collapsible
            shown={ctx.sideData.value.radio_level_2 === 2}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите дату обращения с заявлением о вынесении судебного
                    приказа:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите дату" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите дату определеия об отменен судебного приказа:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите дату" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите номер дела из картотеки арбитражных дел:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите номер" />
              </div>
            </div>
          </Collapsible>
          <SideComponents.RadioLabel text="Я уже обращался с заявлением о вынесении судебного приказа, однако судебный приказ был отменён в связи с подачей возражений должника." />
          <Collapsible
            shown={ctx.sideData.value.radio_level_2 === 3}
            duration="0.1s"
          >
            <div className="sydside-app ">
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите дату обращения с заявлением о вынесении судебного
                    приказа:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите дату" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Введите дату определеия об отменен судебного приказа:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Введите дату" />
              </div>
              <div className="sydside-app-radio-text">
                <div className="sydside-app-radio-text-width">
                  <label class="sydside-label" for="n">
                    Укажите номер дела из картотеки арбитражных дел:
                  </label>
                </div>
                <input type="text" id="n" placeholder="Укажите номер" />
              </div>
            </div>
          </Collapsible>
        </SideComponents.RadioGroup>
      </div>
    </>
  );
}

export default function SydSide() {
  //const ctx = useAppContext(SydContext, "syd");

  // Эквивалентно:
  // const {sideObject, update, ctx} = useSideCommons("zaemshik");
  // const zaemshik = sideObject;
  const ctx = useAppContext(SydContext, "syd");
  const [page, setCount] = useState(0);
  const color = [
    {
      id: 1,
      text: "standard-button",
    },
    {
      id: 2,
      text: "standard-button",
    },
    {
      id: 3,
      text: "standard-button",
    },
    {
      id: 4,
      text: "standard-button",
    },
    {
      id: 5,
      text: "standard-button",
    },
    {
      id: 6,
      text: "standard-button",
    },
    {
      id: 7,
      text: "standard-button",
    },
  ];
  return (
    <div className="App">
      <img src="../../../public/sides/hammer.jpg" alt="xd" />
      {page === 1 &&
        "Вид производства: Исковое производство в Арбитражном суде"}
      {page === 2 &&
        "Вид производства: Упрощенное производство в Арбитражном суде"}
      {page === 3 &&
        "Вид производства: Приказное производство в Арбитражном суде"}
      {page === 4 && "Вид производства: Исковое производство у мировых судей"}
      {page === 5 &&
        "Вид производства: Исковое производство в суде общей юрисдикции"}
      {page === 6 &&
        "Вид производства: Упрощенное производство в суде общей юрисдикции"}
      {page === 7 &&
        "Вид производства: Приказное производство у мирового судьи"}

      <div className="sydside-split-button">
        <input
          type="button"
          className={"sydside-button-route"}
          value="1"
          onClick={() => setCount(1)}
        ></input>
        <input
          type="button"
          className="sydside-button-route"
          value="2"
          onClick={() => setCount(2)}
        ></input>
        <input
          type="button"
          className="sydside-button-route"
          value="3"
          onClick={() => setCount(3)}
        ></input>
        <input
          type="button"
          className="sydside-button-route"
          value="4"
          onClick={() => setCount(4)}
        ></input>
        <input
          type="button"
          className="sydside-button-route"
          value="5"
          onClick={() => setCount(5)}
        ></input>
        <input
          type="button"
          className="sydside-button-route"
          value="6"
          onClick={() => setCount(6)}
        ></input>
        <input
          type="button"
          className="sydside-button-route"
          value="7"
          onClick={() => setCount(7)}
        ></input>
      </div>
      {page === 1 && <ActionProduction />}
      {page === 2 && <SimplifiedProduction />}
      {page === 3 && <OrderProduction />}
      {page === 4 && <ActionProductionJusties />}
      {page === 5 && <ActionProductionJurisdiction />}
      {page === 6 && <SimplifiedProductionJurisdiction />}
      {page === 7 && <OrderProductionJusties />}
    </div>
  );
}
