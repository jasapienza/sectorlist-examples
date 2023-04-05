import define1 from "./c8fd4b84acfac69c@1725.js";
import define2 from "./140f555faa1ea41f@2011.js";
import define3 from "./a33468b95d0b15b0@808.js";
import define4 from "./2485e40047ad1798@353.js";
import define5 from "./0f2fc775435b2814@262.js";

function _1(md){return(
md`# Part 3) Sector List Experiment 1 - Map Algebra`
)}

function _2(md){return(
md`In this experiment, we show how some types of map algebra operations can be performed using sector lists.

More specifically, we show how GIS-based multi-criteria decision analysis (GIS-MCDA) defined by weighted summations can be computed on polygonal maps using sector lists (SL) and their operations.

In the following, we describe two criteria used to create a map of agricultural potential. Each criterion, in turn, is associated with a region map encoded as a SL. Both geographical datasets were produced by Instituto Brasileiro de Geografia e Estatística at the cartographic scale 1:500,000 and are available from  https://www.ibge.gov.br/geociencias/downloads-geociencias.html. Since the original datasets have millions of vertices, we applied the [Ramer-Douglas-Peucker](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm) algorithm to simplify the geometries in order to make this interactive example more performant.`
)}

function _3(md){return(
md`## First Criterion - Brazil Land Fertility`
)}

function _4(md){return(
md`The land fertility map has three classes: _poor_, _regular_ and _good_. Since map data was obtained in [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) format, we provide an utility function called _geojsonToSectorList_, which performs the conversion by applying the _Convert To_ operator each vertex circulation. This function requires a feature-to-weight mapping, which we defined so that regions classified as poor, regular and good are mapped to scalar weights 1, 3 and 5, respectively. Clearly, the bigger the weight, the greater the potential for agriculture.

We describe below three steps to represent this criterion by a sector list from a GeoJSON. In addition, we also points out two optional steps in case the polygon map has topology errors between classes.`
)}

function _5(md){return(
md`**Step 1)** Read GeoJSON data with polygonal map.`
)}

function _6(FileAttachment){return(
FileAttachment("fertility3@1.json").url()
)}

async function _fertJSON(){return(
JSON.parse(await fetch("https://static.observableusercontent.com/files/55adea6a11e2bbd749fc5fd43b8780170444c7c7e25457090761c585bac7e692e1d64d7a6ec97332356368046d8bf70ed4e2f78ec8de3b9127a7f16393a56f92").then(pr => pr.text()))
)}

function _8(cell){return(
cell`fertJSON = JSON.parse(await fetch("https://static.observableusercontent.com/files/55adea6a11e2bbd749fc5fd43b8780170444c7c7e25457090761c585bac7e692e1d64d7a6ec97332356368046d8bf70ed4e2f78ec8de3b9127a7f16393a56f92").then(pr => pr.text()))`
)}

function _geojson_fert(fertJSON){return(
fertJSON
)}

function _10(cell){return(
cell`geojson_fert = FileAttachment("fertility.json").json()`
)}

function _11(tex,md){return(
md`**Step 2)** Define the function ${tex`fertilityToWeight(class) = w`} to map a class to a scalar weight ${tex`w`}.`
)}

function _fertilityToWeight(d3){return(
d3.scaleOrdinal(
  ["_", "Poor", "Regular", "Good"],
  [0, 1, 3, 5]
)
)}

function _13(cell){return(
cell`fertilityToWeight = d3.scaleOrdinal(
  ["_", "Poor", "Regular", "Good"],
  [0, 1, 3, 5]
)`
)}

function _14(md){return(
md`**Step 3)** Convert the data in GeoJSON to a SL representation.`
)}

function _SLFertilityRaw(geoJsonToSectorList,geojson_fert,fertilityToWeight){return(
geoJsonToSectorList(geojson_fert, 600, (feat) =>
  fertilityToWeight(feat.properties.class)
)
)}

function _16(cell){return(
cell`SLFertilityRaw = geoJsonToSectorList(geojson_fert, 600, (feat) =>
  fertilityToWeight(feat.properties.class)
)`
)}

function _17(md){return(
md`**Step 4)** Optionally, we can perform cleaning operations on the converted scalar field, since overlaps between adjacent polygons (i.e. a kind of topological error in a polygonal map) can occur in the input geographic data. Note that we expect to find only values 1, 3, 5 and 0 in the resulting scalar field. We can check whether the converted field conforms to this expectation by calling a special utility function called _scalarValues_, which returns all different scalar values occurring in a field represented by an SL:`
)}

function _18(scalarValues,SLFertilityRaw){return(
scalarValues(SLFertilityRaw)
)}

function _19(cell){return(
cell`scalarValues(SLFertilityRaw)`
)}

function _20(md){return(
md`As seen above, the conversion revealed some inconsistencies in the original data. For instance, overlaps between regions of class poor and regular generated regions in the scalar field mapped to 1 + 3 = 4. This problem can be solved by applying
a scalar transformation that maps regions with unexpected values to zero:`
)}

function _SLFertility(SLFertilityRaw,cleanupMap){return(
SLFertilityRaw.scalarTransformation(cleanupMap([1, 3, 5]))
)}

function _22(cell){return(
cell`SLFertility = SLFertilityRaw.scalarTransformation(cleanupMap([1, 3, 5]))`
)}

function _23(md){return(
md`Running the _scalarValues_ function again, we notice that the returned values are as expected:`
)}

function _24(scalarValues,SLFertility){return(
scalarValues(SLFertility)
)}

function _25(cell){return(
cell`scalarValues(SLFertility)`
)}

function _26(md){return(
md`**Step 5)** Optionally, we can draw the final SL by calling, say, utility function _fieldRender_. This, in turn, requires a class to color mapping. Here, we use _d3.scaleOrdinal_ to build such a mapping. 
`
)}

function _fertilityColorScale(d3,fertilityToWeight){return(
d3.scaleOrdinal(fertilityToWeight.range(), [
  "#fff",
  "#fee5d9",
  "#fcae91",
  "#fb6a4a"
])
)}

function _28(cell){return(
cell`fertilityColorScale = d3.scaleOrdinal(fertilityToWeight.range(), [
  "#fff",
  "#fee5d9",
  "#fcae91",
  "#fb6a4a"
])`
)}

function _29(md){return(
md`A legend for the mapping can be produced by the Legend utility. Note that we use "poor", "regular" and "good" as labels for the field values, since this is more readable than 1, 3, and 5.`
)}

function _30(Legend,d3,fertilityToWeight,fertilityColorScale){return(
Legend(d3.scaleOrdinal(fertilityToWeight.domain(), fertilityColorScale.range()))
)}

function _31(cell){return(
cell`Legend(d3.scaleOrdinal(fertilityToWeight.domain(), fertilityColorScale.range()))`
)}

function _32(md){return(
md`Finally, we call _fieldRender_, which produces a WebGL rendering of the field by calling methods _convertFrom_ and _findEdges_. The first produces trapezoids that are rendered as two triangles, and the second produces line segments that separate regions mapped to different values. The function also supports a tooltip-generating function, which is useful to inspect the field interactively.`
)}

function _33(fieldRender,SLFertility,fertilityColorScale,d3,fertilityToWeight){return(
fieldRender(SLFertility, {
  fieldColor: fertilityColorScale,
  tooltipMap: d3.scaleOrdinal(
    fertilityToWeight.range(),
    fertilityToWeight.domain()
  ),
  width: 600,
  height: 600,
  margin: 20
})
)}

function _34(cell){return(
cell`fieldRender(SLFertility, {
  fieldColor: fertilityColorScale,
  tooltipMap: d3.scaleOrdinal(
    fertilityToWeight.range(),
    fertilityToWeight.domain()
  ),
  width: 600,
  height: 600,
  margin: 20
})`
)}

function _35(md){return(
md`## Second Criterion - Brazil Relief`
)}

function _36(md){return(
md`The relief map of Brazil defines 4 classes: _depression_, _ridge_, _plateau_ and _lowland_. These are mapped to scalar weights 1, 2, 4 and 5 by the _convertTo_ operation, respectively. Thus, a second SL is produced following the same steps as the previous criterion.`
)}

function _37(md){return(
md`**Step 1) ** Read GeoJSON data with polygonal map.`
)}

function _38(FileAttachment){return(
FileAttachment("relief3@1.json").url()
)}

async function _reliefJSON(){return(
JSON.parse(await fetch("https://static.observableusercontent.com/files/4dc2dae322a42e44b97b46e6b2f39b2d24cfaa1d73c31cabefaba3efb1dae8dfb7bd18e038a2cfa617187d73db996de4285ffaf13e36e9bee67544bacf5ff2d9").then(pr => pr.text()))
)}

function _40(cell){return(
cell`reliefJSON = JSON.parse(await fetch("https://static.observableusercontent.com/files/4dc2dae322a42e44b97b46e6b2f39b2d24cfaa1d73c31cabefaba3efb1dae8dfb7bd18e038a2cfa617187d73db996de4285ffaf13e36e9bee67544bacf5ff2d9").then(pr => pr.text()))`
)}

function _geojson_relief(reliefJSON){return(
reliefJSON
)}

function _42(cell){return(
cell`geojson_relief = FileAttachment("relief3@1.json").json();`
)}

function _43(tex,md){return(
md`**Step 2)** Define the function ${tex`reliefToWeight(class) = w`} to map a class to a scalar weight ${tex`w`}.`
)}

function _reliefToWeight(d3){return(
d3.scaleOrdinal(
  ["_", "Depression", "Ridge", "Plateau", "Lowland"],
  [0, 1, 3, 4, 5]
)
)}

function _45(cell){return(
cell`reliefToWeight = d3.scaleOrdinal(
  ["_", "Depression", "Ridge", "Plateau", "Lowland"],
  [0, 1, 3, 4, 5]
)`
)}

function _46(md){return(
md`**Step 3)** Convert the data in GeoJSON to a SL representation.`
)}

function _SLReliefRaw(geoJsonToSectorList,geojson_relief,reliefToWeight){return(
geoJsonToSectorList(geojson_relief, 600, (feat) =>
  reliefToWeight(feat.properties.class)
)
)}

function _48(cell){return(
cell`SLReliefRaw = geoJsonToSectorList(geojson_relief, 600, (feat) =>
  reliefToWeight(feat.properties.class)
)`
)}

function _49(md){return(
md`**Step 4)** Optionally, we can use _scalarValues_ to check whether the resulting field contains unexpected values, i.e., values other than 0, 1, 2, 4 and 5. `
)}

function _50(scalarValues,SLReliefRaw){return(
scalarValues(SLReliefRaw)
)}

function _51(cell){return(
cell`scalarValues(SLReliefRaw)`
)}

function _52(md){return(
md`We notice that, in this case, the scalar values are as expected. So we can define the SLRelief field
as identical to SLReliefRaw.`
)}

function _SLRelief(SLReliefRaw){return(
SLReliefRaw
)}

function _54(cell){return(
cell`SLRelief = SLReliefRaw`
)}

function _55(md){return(
md`**Step 5)** Optionally, we draw the final SL.`
)}

function _reliefColorScale(d3,reliefToWeight){return(
d3.scaleOrdinal(reliefToWeight.domain(), [
  "#fff",
  "#aaa",
  "#377eb8",
  "#ff7f00",
  "#984ea3"
])
)}

function _57(cell){return(
cell`reliefColorScale = d3.scaleOrdinal(reliefToWeight.domain(), [
  "#fff",
  "#aaa",
  "#377eb8",
  "#ff7f00",
  "#984ea3"
])`
)}

function _58(Legend,d3,reliefToWeight,reliefColorScale){return(
Legend(d3.scaleOrdinal(reliefToWeight.domain(), reliefColorScale.range()))
)}

function _59(cell){return(
cell`Legend(d3.scaleOrdinal(reliefToWeight.domain(), reliefColorScale.range()))`
)}

function _60(fieldRender,SLRelief,reliefColorScale,d3,reliefToWeight){return(
fieldRender(SLRelief, {
  fieldColor: reliefColorScale,
  tooltipMap: d3.scaleOrdinal(reliefToWeight.range(), reliefToWeight.domain()),
  width: 600,
  height: 600,
  margin: 20
})
)}

function _61(cell){return(
cell`fieldRender(SLRelief, {
  fieldColor: reliefColorScale,
  tooltipMap: d3.scaleOrdinal(reliefToWeight.range(), reliefToWeight.domain()),
  width: 600,
  height: 600,
  margin: 20
})`
)}

function _62(md){return(
md`## Agricultural Potential Result`
)}

function _63(tex,md){return(
md`At this point, we have each criterion represented as a scalar field using SLs. For some types of GIS-MCDA,  the aim is to generate a weighted sum of individual criteria. In our case, we define weighted sum ${tex`S_{agr} = 4 S_{fer}+6 S_{rel}`}, where subscripts ${tex`agr`}, ${tex`fer`}, and ${tex`rel`} denote fields _agricultural potential_, _fertility_ and _relief_, respectively.

Two scalar multiplications and one _add_ operation are required to compute the sector list for ${tex`S_{agr}`}:`
)}

function _SLWeightedSum(SLFertility,SLRelief){return(
SLFertility.scalarMultiplication(4).add(SLRelief.scalarMultiplication(6))
)}

function _65(cell){return(
cell`SLWeightedSum = SLFertility.scalarMultiplication(4).add(SLRelief.scalarMultiplication(6));`
)}

function _66(md){return(
md`Since each input scalar field has values between 0 and 5, the final field can have values between 0 and 50. In this example, the scalar values of the weighted sum are:`
)}

function _67(scalarValues,SLWeightedSum){return(
scalarValues(SLWeightedSum)
)}

function _68(cell){return(
cell`scalarValues(SLWeightedSum)`
)}

function _69(md){return(
md`As done before with the criteria, we can draw the final result:`
)}

function _sumColorScale(d3){return(
d3.scaleSequential([0,50],d3.interpolateBlues)
)}

function _71(cell){return(
cell`sumColorScale = d3.scaleSequential([0,50],d3.interpolateBlues);`
)}

function _72(Legend,sumColorScale){return(
Legend(sumColorScale, {
  title: "Agricultural Potential"
})
)}

function _73(cell){return(
cell`Legend(sumColorScale, {
  title: "Agricultural Potential"
})`
)}

function _74(fieldRender,SLWeightedSum,d3,sumColorScale){return(
fieldRender(SLWeightedSum, {
  fieldColor: d3.scaleOrdinal(
    d3.range(0, 51),
    d3.range(0, 51).map(sumColorScale)
  ),
  showEdges: false,
  tooltipMap: "auto",
  width: 600,
  height: 600,
  margin: 20
})
)}

function _75(cell){return(
cell`fieldRender(SLWeightedSum, {
  fieldColor: d3.scaleOrdinal(
    d3.range(0, 51),
    d3.range(0, 51).map(sumColorScale)
  ),
  showEdges: false,
  tooltipMap: "auto",
  width: 600,
  height: 600,
  margin: 20
})
`
)}

function _76(tex,md){return(
md`## Agricultural potential classification

As an optional step, we can establish a more coarse-grained classification by establishing thresholds that define areas with *Low*, *Midrange* or *High* potential for agriculture. 
Use the two sliders to define the cut-off thresholds ${tex`A`} and ${tex`B`}.`
)}

function _parametersPotential(html)
{
  const form = html`<form style="font: 12px var(--sans-serif); line-height: 150%">
  <label style="display: block;">
    <input name=break1 type=range min=1 max=50 step=1 style="width:280px;" value=12>
    A = <output name=lblbreak1></output>
  </label>
  <label style="display: block;">
    <input name=break2 type=range min=1 max=50 step=1 style="width:280px;" value=30>
    B = <output name=lblbreak2></output>
  </label>
  <label style="display: block; font-size: 14px;">
    <div name=color1 style="width: 20px; height: 12px; background-color: #fde0dd; display: inline-block; margin-right: 10px"></div>
    Low Potential &nbsp;&nbsp;(1 - <output name=lbl1></output>)<br>
    <div name=color2 style="width: 20px; height: 12px; background-color: #fa9fb5; display: inline-block; margin-right: 10px"></div>
    Mid Potential &nbsp;&nbsp;&nbsp;[<output name=lbl2></output> - <output name=lbl3></output>)<br>
    <div name=color3 style="width: 20px; height: 12px; background-color: #c51b8a; display: inline-block; margin-right: 10px"></div>
    High Potential &nbsp;[<output name=lbl4></output> - 50)
</form>`;
  form.oninput = () => {
    form.value = [form.break1.valueAsNumber, form.break2.valueAsNumber];
    form.break1.valueAsNumber = Math.min(
      form.break1.valueAsNumber,
      form.break2.valueAsNumber - 1
    );
    form.lblbreak1.value = form.break1.valueAsNumber;
    form.lbl1.value = form.break1.valueAsNumber;
    form.lbl2.value = form.break1.valueAsNumber;
    form.lblbreak2.value = form.break2.valueAsNumber;
    form.lbl3.value = form.break2.valueAsNumber;
    form.lbl4.value = form.break2.valueAsNumber;
  };
  form.oninput();
  return form;
}


function _78(tex,md){return(
md`Thus, a scalar transformation is applied such that its function returns:

${tex`1`}, if ${tex`w < A`};<br>
${tex`2`}, if ${tex`A \leq w \leq B`};<br>
${tex`3`}, if ${tex`w > B`}.

The function below computes this classification.`
)}

function _potentialClassifier(d3,parametersPotential){return(
d3.scaleThreshold(
  [1, ...parametersPotential],
  [0, 1, 2, 3]
)
)}

function _80(cell){return(
cell`potentialClassifier = d3.scaleThreshold(
  [1, ...parametersPotential],
  [0, 1, 2, 3]
)`
)}

function _81(md){return(
md`A color scale for the classification is defined below.`
)}

function _classColorScale(d3){return(
d3.scaleOrdinal(
  ["_", "Low", "Mid", "High"],
  ["#fff", "#fde0dd", "#fa9fb5", "#c51b8a"]
)
)}

function _83(cell){return(
cell`classColorScale = d3.scaleOrdinal(
  ["_", "Low", "Mid", "High"],
  ["#fff", "#fde0dd", "#fa9fb5", "#c51b8a"]
)`
)}

function _84(md){return(
md`The scale below is used to produce proper labels for our integer class values.`
)}

function _classWeightColorScale(d3,classColorScale){return(
d3.scaleOrdinal([0, 1, 2, 3], classColorScale.range())
)}

function _86(cell){return(
cell`classWeightColorScale = d3.scaleOrdinal([0, 1, 2, 3], classColorScale.range())`
)}

function _87(md){return(
md`Finally we compute the agricultural potential classification using a simple scalar transformation.`
)}

function _SLClassified(SLWeightedSum,potentialClassifier){return(
SLWeightedSum.scalarTransformation(potentialClassifier)
)}

function _89(cell){return(
cell`SLClassified = SLWeightedSum.scalarTransformation(potentialClassifier)`
)}

function _90(md){return(
md`And below we render the classification map.`
)}

function _91(Legend,classColorScale){return(
Legend(classColorScale)
)}

function _92(cell){return(
cell`Legend(classColorScale)`
)}

function _93(fieldRender,SLClassified,classWeightColorScale,d3,classColorScale){return(
fieldRender(SLClassified, {
  fieldColor: classWeightColorScale,
  showEdges: false,
  tooltipMap: d3.scaleOrdinal([0, 1, 2, 3], classColorScale.domain()),
  width: 600,
  height: 600,
  margin: 20
})
)}

function _94(cell){return(
cell`fieldRender(SLClassified, {
  fieldColor: classWeightColorScale,
  showEdges: false,
  tooltipMap: d3.scaleOrdinal([0, 1, 2, 3], classColorScale.domain()),
  width: 600,
  height: 600,
  margin: 20
})`
)}

function _95(tex,md){return(
md`## Cross product mapping

Rather than creating a classifier based on an algebraic rule, it is possible to directly map all
Fertility and Relief class combinations to any desired value. A cross product of relief and fertility classes can be produced by computing a scalar field corresponding to ${tex`S_{rel}+10 S_{fer}`}:`
)}

function _SLUniqueCombinations(SLFertility,SLRelief){return(
SLFertility.add(SLRelief.scalarMultiplication(10))
)}

function _97(cell){return(
cell`SLUniqueCombinations = SLFertility.add(SLRelief.scalarMultiplication(10))`
)}

function _98(md){return(
md`By calling _scalarValues_ for the resulting field, we notice some unexpected values. For instance, the value of 40 corresponds to _fertility_ = 4 and _relief_ = 0. This is due to the fact that the Brazil boundaries of the two maps are not exactly coincident:`
)}

function _99(scalarValues,SLUniqueCombinations){return(
scalarValues(SLUniqueCombinations)
)}

function _100(cell){return(
cell`scalarValues(SLUniqueCombinations)`
)}

function _101(md){return(
md`The table below allows you to 
select a different scalar between -7 and 7 to any Fertility/Relief combination. `
)}

function _parametersTableMap(reliefToWeight,fertilityToWeight,colorScale,html)
{
  const possibleValues = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];

  // first line
  let table = "<table><tr><td>Land Use / Slope</td>";
  for (let rcls of reliefToWeight.domain()) {
    const label = (rcls != '_' ? rcls : '∅');
    table += "<td>" + label + " = " + reliefToWeight(rcls) + "</td>";
  }
  table += "</tr>";
  // other lines
  for (let fcls of fertilityToWeight.domain()) {
    const label = (fcls != '_' ? fcls : '∅');
    table += "<tr><td>" + label + " = " + fertilityToWeight(fcls) + "</td>";
    for (let rcls of reliefToWeight.domain()) {
      const w = 10 * reliefToWeight(rcls) + fertilityToWeight(fcls);
      if (w == 0) {
        table += "<td>0 => 0</td>";
        continue;
      }
      table += "<td>" +
        w +
        " => <select style='color: #fff; font-weight: bold' class='sel' id='sel-" +
        w +
        "'>";
      const initialvalue = possibleValues[~~(Math.random() * possibleValues.length)];
      for (let i of possibleValues) {
        table +=
          "<option style='font-weight: bold; color: #fff; background-color: " +
          colorScale(i) +
          "' value='" +
          i +
          "'" +
          (i == initialvalue ? " selected" : "") +
          ">" +
          i +
          "</option>";
      }
      table += "</select>";
    }
    table += "</tr>";
  }
  table += "</table>";
  let form = html`<form style="font: 13px var(--sans-serif);display: block;">${table}</form>`;
  form.oninput = () => {
    const selects = form.querySelectorAll(".sel");
    let values = {};
    for (let sel of selects) {
      const combination = sel.id.split("-")[1];
      const val = parseInt(sel.value);
      values[combination] = val;
      sel.style.backgroundColor = colorScale(val);
    }
    form.value = values;
  };
  form.oninput();
  return form;
}


function _103(md){return(
md`From the table above, we perform a scalar transformation to remap the scalar values into a new sector list:`
)}

function _SLClassifiedCombinations(SLUniqueCombinations,parametersTableMap){return(
SLUniqueCombinations.scalarTransformation(
  //(x) => Math.floor(x % 10) // Relief only
  //(x) => Math.floor(x / 10) // Fertility only
  // (x) => x
  // (x) => (x > 0 ? 1 : 0) // Just the outline
  (x) => parametersTableMap[x] || 0
)
)}

function _105(cell){return(
cell`SLClassifiedCombinations = SLUniqueCombinations.scalarTransformation(
  //(x) => Math.floor(x % 10) // Relief only
  //(x) => Math.floor(x / 10) // Fertility only
  // (x) => x
  // (x) => (x > 0 ? 1 : 0) // Just the outline
  (x) => parametersTableMap[x] || 0
);`
)}

function _106(md){return(
md`Finally, we render the new sector list representing the result:`
)}

function _107(Legend,colorScale){return(
Legend(colorScale, {
  title: "field value"
})
)}

function _108(cell){return(
cell`Legend(colorScale, {
  title: "field value"
})`
)}

function _109(fieldRender,SLClassifiedCombinations,colorScale,d3){return(
fieldRender(SLClassifiedCombinations, {
  fieldColor: colorScale,
  showEdges: false,
  tooltipMap: d3.scaleOrdinal(d3.range(-7, 8), colorScale.domain()),
  width: 600,
  height: 600,
  margin: 20
})
)}

function _110(cell){return(
cell`fieldRender(SLClassifiedCombinations, {
  fieldColor: colorScale,
  showEdges: false,
  tooltipMap: d3.scaleOrdinal(d3.range(-7, 8), colorScale.domain()),
  width: 600,
  height: 600,
  margin: 20
})`
)}

function _111(md){return(
md`## Imports`
)}

function _113(cell){return(
cell`import { Constants, SectorList } from "@jasapienza/part-1-sector-list-implementation-in-javascript"`
)}

function _115(cell){return(
cell`import { colorScale, fieldRender } from "140f555faa1ea41f"`
)}

function _117(cell){return(
cell`import {Legend} from '@d3/color-legend'`
)}

function _119(cell){return(
cell`import { geoJsonToSectorList, cleanupMap, scalarValues } from "2485e40047ad1798"`
)}

function _121(cell){return(
cell`import { cell } from "@esperanc/show-code-utility"`
)}

function _convertGeoJsonToSL(SectorList){return(
function(json,prop,weights,bbox) {
    const convertCoords = function(coords,w) {
        if (typeof coords[0][0] != "number") {
            let sls = [];
            for (let part of coords) {
                sls.push(convertCoords(part,w));
            }
            return sls;
        } else {
            return SectorList.convertFrom(coords.flat(),w,bbox);
        }
    }
    let sectorlists = json.features.map(function(feat){
                        let coords = feat.geometry.coordinates;
                        let pvalue = feat.properties[prop];
                        return convertCoords(coords,weights[pvalue]);
                     }).flat(Infinity);
    return sectorlists.reduce(function(sl_add,sl) {
      return sl_add.add(sl);
    },new SectorList(bbox));
}
)}

function _123(cell){return(
cell`convertGeoJsonToSL = function(json,prop,weights,bbox) {
    const convertCoords = function(coords,w) {
        if (typeof coords[0][0] != "number") {
            let sls = [];
            for (let part of coords) {
                sls.push(convertCoords(part,w));
            }
            return sls;
        } else {
            return SectorList.convertFrom(coords.flat(),w,bbox);
        }
    }
    let sectorlists = json.features.map(function(feat){
                        let coords = feat.geometry.coordinates;
                        let pvalue = feat.properties[prop];
                        return convertCoords(coords,weights[pvalue]);
                     }).flat(Infinity);
    return sectorlists.reduce(function(sl_add,sl) {
      return sl_add.add(sl);
    },new SectorList(bbox));
}`
)}

function _fertility31(FileAttachment){return(
FileAttachment("fertility3@1.json").json()
)}

function _relief31(FileAttachment){return(
FileAttachment("relief3@1.json").json()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["relief3@1.json", {url: new URL("./files/4dc2dae322a42e44b97b46e6b2f39b2d24cfaa1d73c31cabefaba3efb1dae8dfb7bd18e038a2cfa617187d73db996de4285ffaf13e36e9bee67544bacf5ff2d9.json", import.meta.url), mimeType: "application/json", toString}],
    ["fertility3@1.json", {url: new URL("./files/55adea6a11e2bbd749fc5fd43b8780170444c7c7e25457090761c585bac7e692e1d64d7a6ec97332356368046d8bf70ed4e2f78ec8de3b9127a7f16393a56f92.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["FileAttachment"], _6);
  main.variable(observer("fertJSON")).define("fertJSON", _fertJSON);
  main.variable(observer()).define(["cell"], _8);
  main.variable(observer("geojson_fert")).define("geojson_fert", ["fertJSON"], _geojson_fert);
  main.variable(observer()).define(["cell"], _10);
  main.variable(observer()).define(["tex","md"], _11);
  main.variable(observer("fertilityToWeight")).define("fertilityToWeight", ["d3"], _fertilityToWeight);
  main.variable(observer()).define(["cell"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("SLFertilityRaw")).define("SLFertilityRaw", ["geoJsonToSectorList","geojson_fert","fertilityToWeight"], _SLFertilityRaw);
  main.variable(observer()).define(["cell"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["scalarValues","SLFertilityRaw"], _18);
  main.variable(observer()).define(["cell"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("SLFertility")).define("SLFertility", ["SLFertilityRaw","cleanupMap"], _SLFertility);
  main.variable(observer()).define(["cell"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["scalarValues","SLFertility"], _24);
  main.variable(observer()).define(["cell"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("fertilityColorScale")).define("fertilityColorScale", ["d3","fertilityToWeight"], _fertilityColorScale);
  main.variable(observer()).define(["cell"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["Legend","d3","fertilityToWeight","fertilityColorScale"], _30);
  main.variable(observer()).define(["cell"], _31);
  main.variable(observer()).define(["md"], _32);
  main.variable(observer()).define(["fieldRender","SLFertility","fertilityColorScale","d3","fertilityToWeight"], _33);
  main.variable(observer()).define(["cell"], _34);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["FileAttachment"], _38);
  main.variable(observer("reliefJSON")).define("reliefJSON", _reliefJSON);
  main.variable(observer()).define(["cell"], _40);
  main.variable(observer("geojson_relief")).define("geojson_relief", ["reliefJSON"], _geojson_relief);
  main.variable(observer()).define(["cell"], _42);
  main.variable(observer()).define(["tex","md"], _43);
  main.variable(observer("reliefToWeight")).define("reliefToWeight", ["d3"], _reliefToWeight);
  main.variable(observer()).define(["cell"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer("SLReliefRaw")).define("SLReliefRaw", ["geoJsonToSectorList","geojson_relief","reliefToWeight"], _SLReliefRaw);
  main.variable(observer()).define(["cell"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer()).define(["scalarValues","SLReliefRaw"], _50);
  main.variable(observer()).define(["cell"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer("SLRelief")).define("SLRelief", ["SLReliefRaw"], _SLRelief);
  main.variable(observer()).define(["cell"], _54);
  main.variable(observer()).define(["md"], _55);
  main.variable(observer("reliefColorScale")).define("reliefColorScale", ["d3","reliefToWeight"], _reliefColorScale);
  main.variable(observer()).define(["cell"], _57);
  main.variable(observer()).define(["Legend","d3","reliefToWeight","reliefColorScale"], _58);
  main.variable(observer()).define(["cell"], _59);
  main.variable(observer()).define(["fieldRender","SLRelief","reliefColorScale","d3","reliefToWeight"], _60);
  main.variable(observer()).define(["cell"], _61);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer()).define(["tex","md"], _63);
  main.variable(observer("SLWeightedSum")).define("SLWeightedSum", ["SLFertility","SLRelief"], _SLWeightedSum);
  main.variable(observer()).define(["cell"], _65);
  main.variable(observer()).define(["md"], _66);
  main.variable(observer()).define(["scalarValues","SLWeightedSum"], _67);
  main.variable(observer()).define(["cell"], _68);
  main.variable(observer()).define(["md"], _69);
  main.variable(observer("sumColorScale")).define("sumColorScale", ["d3"], _sumColorScale);
  main.variable(observer()).define(["cell"], _71);
  main.variable(observer()).define(["Legend","sumColorScale"], _72);
  main.variable(observer()).define(["cell"], _73);
  main.variable(observer()).define(["fieldRender","SLWeightedSum","d3","sumColorScale"], _74);
  main.variable(observer()).define(["cell"], _75);
  main.variable(observer()).define(["tex","md"], _76);
  main.variable(observer("viewof parametersPotential")).define("viewof parametersPotential", ["html"], _parametersPotential);
  main.variable(observer("parametersPotential")).define("parametersPotential", ["Generators", "viewof parametersPotential"], (G, _) => G.input(_));
  main.variable(observer()).define(["tex","md"], _78);
  main.variable(observer("potentialClassifier")).define("potentialClassifier", ["d3","parametersPotential"], _potentialClassifier);
  main.variable(observer()).define(["cell"], _80);
  main.variable(observer()).define(["md"], _81);
  main.variable(observer("classColorScale")).define("classColorScale", ["d3"], _classColorScale);
  main.variable(observer()).define(["cell"], _83);
  main.variable(observer()).define(["md"], _84);
  main.variable(observer("classWeightColorScale")).define("classWeightColorScale", ["d3","classColorScale"], _classWeightColorScale);
  main.variable(observer()).define(["cell"], _86);
  main.variable(observer()).define(["md"], _87);
  main.variable(observer("SLClassified")).define("SLClassified", ["SLWeightedSum","potentialClassifier"], _SLClassified);
  main.variable(observer()).define(["cell"], _89);
  main.variable(observer()).define(["md"], _90);
  main.variable(observer()).define(["Legend","classColorScale"], _91);
  main.variable(observer()).define(["cell"], _92);
  main.variable(observer()).define(["fieldRender","SLClassified","classWeightColorScale","d3","classColorScale"], _93);
  main.variable(observer()).define(["cell"], _94);
  main.variable(observer()).define(["tex","md"], _95);
  main.variable(observer("SLUniqueCombinations")).define("SLUniqueCombinations", ["SLFertility","SLRelief"], _SLUniqueCombinations);
  main.variable(observer()).define(["cell"], _97);
  main.variable(observer()).define(["md"], _98);
  main.variable(observer()).define(["scalarValues","SLUniqueCombinations"], _99);
  main.variable(observer()).define(["cell"], _100);
  main.variable(observer()).define(["md"], _101);
  main.variable(observer("viewof parametersTableMap")).define("viewof parametersTableMap", ["reliefToWeight","fertilityToWeight","colorScale","html"], _parametersTableMap);
  main.variable(observer("parametersTableMap")).define("parametersTableMap", ["Generators", "viewof parametersTableMap"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _103);
  main.variable(observer("SLClassifiedCombinations")).define("SLClassifiedCombinations", ["SLUniqueCombinations","parametersTableMap"], _SLClassifiedCombinations);
  main.variable(observer()).define(["cell"], _105);
  main.variable(observer()).define(["md"], _106);
  main.variable(observer()).define(["Legend","colorScale"], _107);
  main.variable(observer()).define(["cell"], _108);
  main.variable(observer()).define(["fieldRender","SLClassifiedCombinations","colorScale","d3"], _109);
  main.variable(observer()).define(["cell"], _110);
  main.variable(observer()).define(["md"], _111);
  const child1 = runtime.module(define1);
  main.import("Constants", child1);
  main.import("SectorList", child1);
  main.variable(observer()).define(["cell"], _113);
  const child2 = runtime.module(define2);
  main.import("colorScale", child2);
  main.import("fieldRender", child2);
  main.variable(observer()).define(["cell"], _115);
  const child3 = runtime.module(define3);
  main.import("Legend", child3);
  main.variable(observer()).define(["cell"], _117);
  const child4 = runtime.module(define4);
  main.import("geoJsonToSectorList", child4);
  main.import("cleanupMap", child4);
  main.import("scalarValues", child4);
  main.variable(observer()).define(["cell"], _119);
  const child5 = runtime.module(define5);
  main.import("cell", child5);
  main.variable(observer()).define(["cell"], _121);
  main.variable(observer("convertGeoJsonToSL")).define("convertGeoJsonToSL", ["SectorList"], _convertGeoJsonToSL);
  main.variable(observer()).define(["cell"], _123);
  main.variable(observer("fertility31")).define("fertility31", ["FileAttachment"], _fertility31);
  main.variable(observer("relief31")).define("relief31", ["FileAttachment"], _relief31);
  return main;
}
