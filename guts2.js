function generateG(form) {

clean = () => battleBox.innerHTML = "";
clean();

// move to raw forging diameter and height + .1
let xrawHeight = new Big(+document.getElementById("forg_height").value);
let xrawDia = new Big(+document.getElementById("forg_dia").value);
const rawHeight = xrawHeight.plus(.1);
const rawDia = xrawDia.plus(.1);

battleBox.innerHTML += `%<br>T0101;<br>G96 SXXXX M03;<br>M8;<br>`;
battleBox.innerHTML += `G00 X${rawDia} Z${rawHeight};<br>`

//cut the height
finishHeight = +document.getElementById("fin_height").value;
const xfinishHeight = new Big(finishHeight);
while (xrawHeight > finishHeight) {
    if (xrawHeight.minus(finishHeight) > .12) {
        xrawHeight = xrawHeight.minus(.12);
        battleBox.innerHTML += `G01 Z${xrawHeight} F.01;<br>G01 X-.062;<br>G00 X${rawDia} Z${xrawHeight.plus(.01).valueOf()};<br>`;
    } else {
        xrawHeight = finishHeight;
        battleBox.innerHTML += `G01 Z${xfinishHeight.plus(.003).valueOf()} F.01;<br>G01 X-.062;<br>G00 X${rawDia} Z${xfinishHeight.plus(.013).valueOf()};<br>`;
        battleBox.innerHTML += `G01 Z${xfinishHeight} F.008;<br>G01 X-.062;<br>G00 X${rawDia} Z${xfinishHeight.plus(.1).valueOf()};<br>`;
    }
}
battleBox.innerHTML += `T0102;<br>`;

//cut finished diameter +.02
finishDiameter = +document.getElementById("fin_dia").value;
const xfinishDiameter = new Big(finishDiameter);
const absFinDia = xfinishDiameter.plus(.02);
const heightPad = xfinishHeight.plus(.1);
while (xrawDia > absFinDia) {
    if (xrawDia.minus(absFinDia) > .12) {
        xrawDia = xrawDia.minus(.12);
        battleBox.innerHTML += `G00 X${xrawDia};<br>G01 Z.27 F.01;<br>G00 X${xrawDia.plus(.02).valueOf()} Z${heightPad};<br>`;
    } else {
        xrawDia = absFinDia;
        battleBox.innerHTML += `G00 X${absFinDia};<br>G01 Z.27 F.01;<br>G00 X${xrawDia.plus(.02).valueOf()} Z${heightPad};<br>`;
    }
}

battleBox.innerHTML += `G28 U0.0 W0.0;<br>M99;<br>`;
}