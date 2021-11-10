import React from "react";
import SydContext from "../context/SydContext.js";
import SideComponents from "./SideComponents.js";
import { useAppContext } from "./SideCommons.js";
import Collapsible from "../reusable/Collapsible.js";
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
  const tableProps = table.map((table) => <li class="ok"> {table.text}</li>);

  return (
    <>
      <div className="App">
        <div class="split-button">
          <input type="button" class="button-route" value="1"></input>
          <input type="button" class="button-route" value="2"></input>
          <input type="button" class="button-route" value="3"></input>
          <input type="button" class="button-route" value="4"></input>
          <input type="button" class="button-route" value="5"></input>
          <input type="button" class="button-route" value="6"></input>
          <input type="button" class="button-route" value="7"></input>
        </div>
        <div class="split-text">
          <ul class="icon">{tableProps}</ul>
          <div class="App-tema">
            <center>Подсудность</center>
            <div class="App-tema-podtema">
              <p>В суд подается исковое заявление</p>
            </div>
          </div>

          <SideComponents.RadioGroup value="value.test" ctx={ctx}>
            <SideComponents.RadioLabel
              class="radio"
              text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)"
            />
            <Collapsible shown={true} duration="0.1s">
              <div class="App-p-p ">
                <div class="App-radio-text ">
                  <label for="n">Наименование суда:</label>
                  <input type="text" id="n" placeholder="Введите суд" />
                </div>
                <div class="App-radio-text ">
                  <label for="n">Адрес суда:</label>
                  <input type="text" id="n" placeholder="Введите адрес" />
                </div>
              </div>
            </Collapsible>
            <SideComponents.RadioLabel
              class="radio"
              text="Указан конкретный суд, в котором рассматриваются споры по договору"
            />
            <Collapsible shown={true} duration="0.1s">
              <div class="App-p-p ">
                <div class="App-radio-text">
                  <label for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                  <input type="text" id="n" placeholder="Укажите пункт" />
                </div>
                <div class="App-radio-text">
                  <label for="n">Введите наименование суда:</label>
                  <input
                    type="text"
                    id="n"
                    placeholder="Введите наименование суда"
                  />
                </div>
                <div class="App-radio-text">
                  <label for="n">Адрес суда:</label>
                  <input type="text" id="n" placeholder="Введите Адрес суда" />
                </div>
              </div>
            </Collapsible>
            <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства истца" />
            <Collapsible shown={"true"} duration="0.1s">
              <div class="App-p-p ">
                <div class="App-radio-text ">
                  <label for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                  <input type="text" id="n" placeholder="Введите пункт" />
                </div>
                <div class="App-radio-text ">
                  <label for="n">Введите наименование суда:</label>
                  <input type="text" id="n" placeholder="Введите суд" />
                </div>
                <div class="App-radio-text ">
                  <label for="n">Адрес суда:</label>
                  <input type="text" id="n" placeholder="Введите адрес" />
                </div>
              </div>
            </Collapsible>
            <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства Займодавца" />
            <Collapsible shown={"true"} duration="0.1s">
              <div class="App-p-p ">
                <div class="App-radio-text ">
                  <label for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                  <input type="text" id="n" placeholder="Введите пункт" />
                </div>
                <div class="App-radio-text ">
                  <label for="n">
                    Укажите адрес жительства/нахождения займодавца:
                  </label>
                  <input type="text" id="n" placeholder="Введите адрес" />
                </div>
                <div class="App-radio-text ">
                  <label for="n">Введите наименование суда:</label>
                  <input type="text" id="n" placeholder="Введите суд" />
                </div>
                <div class="App-radio-text ">
                  <label for="n">Адрес суда:</label>
                  <input type="text" id="n" placeholder="Введите адрес" />
                </div>
              </div>
            </Collapsible>
            <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />
            <Collapsible shown={"true"} duration="0.1s">
              <div class="App-p-p ">
                <div class="App-radio-text ">
                  <label for="n">
                    Укажите пункт договора, в котором содержится данное условие:
                  </label>
                  <input type="text" id="n" placeholder="Введите пункт" />
                </div>
                <div class="App-radio-text ">
                  <label for="n">
                    Укажите адрес места исполнения договора:
                  </label>
                  <input type="text" id="n" placeholder="Введите адрес" />
                </div>
                <div class="App-radio-text ">
                  <label for="n">Введите наименование суда:</label>
                  <input type="text" id="n" placeholder="Введите суд" />
                </div>
                <div class="App-radio-text ">
                  <label for="n">Адрес суда:</label>
                  <input type="text" id="n" placeholder="Введите адрес" />
                </div>
              </div>
            </Collapsible>
          </SideComponents.RadioGroup>
        </div>
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
  const tableProps = table.map((table) => <li> {table.text}</li>);

  return (
    <>
      <div className="App">
        <ul>{tableProps}</ul>
        <div class="App-tema">
          <center>Подсудность</center>
        </div>
        <SideComponents.RadioGroup value="value.test" ctx={ctx}>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />

            <div class="App-radio-text">
              <p>Наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Укажите пункт договора, в котором содержится данное условие:" />
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Укажите адрес места исполнения договора</p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
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
  const tableProps = table.map((table) => <li> {table.text}</li>);

  return (
    <>
      <div className="App">
        <ul>{tableProps}</ul>
        <SideComponents.RadioGroup value="value.test" ctx={ctx}>
          <div class="App-tema">
            <SideComponents.RadioLabel text="Обратиться за вынесением судебного приказа" />
          </div>
          <SideComponents.RadioGroup value="value.test" ctx={ctx}>
            <div class="App-radio">
              <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />

              <div class="App-radio-text">
                <p>Наименование суда:</p>
              </div>
              <div class="App-radio-text">
                <p>Адрес суда:</p>
              </div>
            </div>
            <div class="App-radio">
              <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
              <div class="App-radio-text">
                <p>
                  Укажите пункт договора, в котором содержится данное условие:
                </p>
              </div>
              <div class="App-radio-text">
                <p>Введите наименование суда:</p>
              </div>
              <div class="App-radio-text">
                <p>Адрес суда:</p>
              </div>
            </div>
            <div class="App-radio">
              <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства истца" />
              <div class="App-radio-text">
                <p>
                  Укажите пункт договора, в котором содержится данное условие:
                </p>
              </div>
              <div class="App-radio-text">
                <p>Введите наименование суда:</p>
              </div>
              <div class="App-radio-text">
                <p>Адрес суда:</p>
              </div>
            </div>
            <div class="App-radio">
              <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства Займодавца" />
              <div class="App-radio-text">
                <p>
                  Укажите пункт договора, в котором содержится данное условие:
                </p>
              </div>
              <div class="App-radio-text">
                <p>Укажите адрес места жительства/нахождения займодавца:</p>
              </div>
              <div class="App-radio-text">
                <p>Введите наименование суда:</p>
              </div>
              <div class="App-radio-text">
                <p>Адрес суда:</p>
              </div>
            </div>
            <div class="App-radio">
              <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора." />
              <div class="App-radio-text">
                <p>
                  Укажите пункт договора, в котором содержится данное условие:
                </p>
              </div>
              <div class="App-radio-text">
                <p>Укажите адрес места исполнения договора:</p>
              </div>
              <div class="App-radio-text">
                <p>Введите наименование суда:</p>
              </div>
              <div class="App-radio-text">
                <p>Адрес суда:</p>
              </div>
            </div>
          </SideComponents.RadioGroup>
          <div class="App-radio">
            <SideComponents.RadioLabel text="У меня имеются письменные возражения заёмщика относительно спорной задолженности." />
            <div class="App-radio-text">
              <p>Наименование документа</p>
            </div>
            <div class="App-radio-text">
              <p>Дата документа:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel
              text="Я уже обращался с заявлением о вынесении судебного приказа, однако Арбитражный суд вынес 
                    определение  об отказе в принятии заявления о вынесении судебного приказа"
            />
            <div class="App-radio-text">
              <p>
                Введите дату обращения с заявлением о вынесении судебного
                приказа:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите дату определеия об отменен судебного приказа:</p>
            </div>
            <div class="App-radio-text">
              <p>Укажите номер дела из картотеки арбитражных дел:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Я уже обращался с заявлением о вынесении судебного приказа, однако судебный приказ был отменён в связи с подачей возражений должника." />
            <div class="App-radio-text">
              <p>
                Введите дату обращения с заявлением о вынесении судебного
                приказа:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите дату определеия об отменен судебного приказа:</p>
            </div>
            <div class="App-radio-text">
              <p>Укажите номер дела из картотеки арбитражных дел:</p>
            </div>
          </div>
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
  const tableProps = table.map((table) => <li> {table.text}</li>);
  return (
    <>
      <div className="App">
        <ul>{tableProps}</ul>
        <div class="App-tema">
          <center>Подсудность</center>
        </div>
        <SideComponents.RadioGroup value="value.test" ctx={ctx}>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />

            <div class="App-radio-text">
              <p>Наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства истца" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства Займодавца" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Укажите адрес жительства/нахождения займодавца:</p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Укажите адрес места исполнения договора</p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
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
  const tableProps = table.map((table) => <li> {table.text}</li>);
  return (
    <>
      <div className="App">
        <ul>{tableProps}</ul>
        <div class="App-tema">
          <center>Подсудность</center>
        </div>
        <SideComponents.RadioGroup value="value.test" ctx={ctx}>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />

            <div class="App-radio-text">
              <p>Наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства истца" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства Займодавца" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Укажите адрес жительства/нахождения займодавца:</p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Укажите адрес места исполнения договора</p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
        </SideComponents.RadioGroup>
      </div>
    </>
  );
}

//упрощенное производство в суде общей юрисдикции
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
  const tableProps = table.map((table) => <li> {table.text}</li>);

  return (
    <>
      <div className="App">
        <ul>{tableProps}</ul>
        <div class="App-tema">
          <center>Подсудность</center>
        </div>
        <SideComponents.RadioGroup value="value.test" ctx={ctx}>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />

            <div class="App-radio-text">
              <p>Наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Указанно, что дело рассматривается по месту нахождения/жительства истца" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Указанно, что дело рассматривается по месту нахождения/жительства Займодавца" />
            <div class="App-radio-text">
              <p>Укажите пункт договора в котором содержится данное условие:</p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора" />
            <div class="App-radio-text">
              <p>
                Укажите пункт договора, в котором содержится данное условие:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Укажите адрес места исполнения договора</p>
            </div>
            <div class="App-radio-text">
              <p>Введите наименование суда:</p>
            </div>
            <div class="App-radio-text">
              <p>Адрес суда:</p>
            </div>
          </div>
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
  const tableProps = table.map((table) => <li> {table.text}</li>);

  return (
    <>
      <div className="App">
        <ul>{tableProps}</ul>
        <SideComponents.RadioGroup value="value.test" ctx={ctx}>
          <div class="App-tema">
            <SideComponents.RadioLabel text="Обратиться за вынесением судебного приказа" />
          </div>
          <SideComponents.RadioGroup value="value.test" ctx={ctx}>
            <div class="App-radio">
              <SideComponents.RadioLabel text="Исковое заявление будет поданно по месту жительства/нахождения ответчика (по умолчанию)" />

              <div class="App-radio-text">
                <p>Наименование суда:</p>
              </div>
              <div class="App-radio-text">
                <p>Адрес суда:</p>
              </div>
            </div>
            <div class="App-radio">
              <SideComponents.RadioLabel text="Указан конкретный суд, в котором рассматриваются споры по договору" />
              <div class="App-radio-text">
                <p>
                  Укажите пункт договора, в котором содержится данное условие:
                </p>
              </div>
              <div class="App-radio-text">
                <p>Введите наименование суда:</p>
              </div>
              <div class="App-radio-text">
                <p>Адрес суда:</p>
              </div>
            </div>
            <div class="App-radio">
              <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства истца" />
              <div class="App-radio-text">
                <p>
                  Укажите пункт договора, в котором содержится данное условие:
                </p>
              </div>
              <div class="App-radio-text">
                <p>Введите наименование суда:</p>
              </div>
              <div class="App-radio-text">
                <p>Адрес суда:</p>
              </div>
            </div>
            <div class="App-radio">
              <SideComponents.RadioLabel text="Указано, что дело рассматривается по месту нахождения/жительства Займодавца" />
              <div class="App-radio-text">
                <p>
                  Укажите пункт договора, в котором содержится данное условие:
                </p>
              </div>
              <div class="App-radio-text">
                <p>Укажите адрес места жительства/нахождения займодавца:</p>
              </div>
              <div class="App-radio-text">
                <p>Введите наименование суда:</p>
              </div>
              <div class="App-radio-text">
                <p>Адрес суда:</p>
              </div>
            </div>
            <div class="App-radio">
              <SideComponents.RadioLabel text="В договоре имеется условие о месте исполнения договора." />
              <div class="App-radio-text">
                <p>
                  Укажите пункт договора, в котором содержится данное условие:
                </p>
              </div>
              <div class="App-radio-text">
                <p>Укажите адрес места исполнения договора:</p>
              </div>
              <div class="App-radio-text">
                <p>Введите наименование суда:</p>
              </div>
              <div class="App-radio-text">
                <p>Адрес суда:</p>
              </div>
            </div>
          </SideComponents.RadioGroup>
          <div class="App-radio">
            <SideComponents.RadioLabel text="У меня имеются письменные возражения заёмщика относительно спорной задолженности." />
            <div class="App-radio-text">
              <p>Наименование документа</p>
            </div>
            <div class="App-radio-text">
              <p>Дата документа:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel
              text="Я уже обращался с заявлением о вынесении судебного приказа, однако Мировой судья вынес 
                    определение  об отказе в принятии заявления о вынесении судебного приказа"
            />
            <div class="App-radio-text">
              <p>
                Введите дату обращения с заявлением о вынесении судебного
                приказа:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите дату определеия об отменен судебного приказа:</p>
            </div>
            <div class="App-radio-text">
              <p>Укажите номер дела из картотеки арбитражных дел:</p>
            </div>
          </div>
          <div class="App-radio">
            <SideComponents.RadioLabel text="Я уже обращался с заявлением о вынесении судебного приказа, однако судебный приказ был отменён в связи с подачей возражений должника." />
            <div class="App-radio-text">
              <p>
                Введите дату обращения с заявлением о вынесении судебного
                приказа:
              </p>
            </div>
            <div class="App-radio-text">
              <p>Введите дату определеия об отменен судебного приказа:</p>
            </div>
            <div class="App-radio-text">
              <p>Укажите номер дела из картотеки арбитражных дел:</p>
            </div>
          </div>
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

  return (
    <div>
      <img
        style={{ width: "100%", height: "100%" }}
        src="../../../public/syd.png"
        alt="xd"
      />
      <ActionProduction />
      <SimplifiedProduction />
      <OrderProduction />
      <ActionProductionJusties />
      <ActionProductionJurisdiction />
      <SimplifiedProductionJurisdiction />
      <OrderProductionJusties />
    </div>
  );
}
