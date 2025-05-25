<template>
  <v-sheet border height="120px" width="300px">
    <v-container>
      <v-row>
        <v-col>
          <ToggleButton>RTE</ToggleButton>
        </v-col>
        <v-col>
          <ToggleButton>CAS</ToggleButton>
        </v-col>
        <v-col>
          <ToggleButton>AIS</ToggleButton>
        </v-col>
        <v-col>
          <ToggleButton>DF</ToggleButton>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>VECTOR</p>
        </v-col>
        <v-col>
          <p>TRAIL</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row>
            <v-col>
              <ToggleButton>OFF</ToggleButton>
            </v-col>
            <v-col>
              <p>m</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              <ToggleButton>OFF</ToggleButton>
            </v-col>
            <v-col>
              <p>m</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
  <v-sheet border height="320px" width="300px">
    <v-container>
      <v-row justify="center">
        <h2>ARPA INFO</h2>
      </v-row>
      <v-row>
        <table v-html="renderTargetTable()" />
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts" setup>
  interface TargetInfo {
    id: number;
    status: string;
    bearing: number;
    range: number; // nM
    course: number;
    speed: number; // knts
    closestPointOfApproach: number;
    timeToCPA: number; // seconds
    bowCrossingRange: number; // nM
    bowCrossingTime: number; // seconds
  }

  const targetInfo : TargetInfo[] = [];

  function renderTargetTable () : string {
    let tableHTML = '<table class="target-table">';
    let idRow = '<tr><th>ID</th>';
    let statusRow = '<tr><th>STAT</th>';
    let bearingRow = '<tr><th>BRG</th>';
    let rangeRow = '<tr><th>RNG</th>';
    let courseRow = '<tr><th>COG</th>';
    let speedRow = '<tr><th>SOG</th>';
    let cpaRow = '<tr><th>CPA</th>';
    let tcpaRow = '<tr><th>TCPA</th>';
    let bcrRow = '<tr><th>BCR</th>';
    let bctRow = '<tr><th>BCT</th>';
    targetInfo.forEach(target => {
      idRow += `<td>${target.id}</td>`;
      statusRow += `<td>${target.status}</td>`;
      bearingRow += `<td>${target.bearing}</td>`;
      rangeRow += `<td>${target.range}</td>`;
      courseRow += `<td>${target.course}</td>`;
      speedRow += `<td>${target.speed}</td>`;
      cpaRow += `<td>${target.closestPointOfApproach}</td>`;
      tcpaRow += `<td>${target.timeToCPA}</td>`;
      bcrRow += `<td>${target.bowCrossingRange}</td>`;
      bctRow += `<td>${target.bowCrossingTime}</td>`;
    });
    if (targetInfo.length < 3) {
      for (let i = targetInfo.length; i < 3; i++) {
        idRow += '<td>==</td>';
        statusRow += '<td>===</td>';
        bearingRow += '<td>===</td>';
        rangeRow += '<td>=.===<td>';
        courseRow += '<td>===<td>';
        speedRow += '<td>==.=<td>';
        cpaRow += '<td>==.=<td>';
        tcpaRow += '<td>==.=<td>';
        bcrRow += '<td>==.=<td>';
        bctRow += '<td>==.=<td>';
      }
    }
    idRow += '<td></td></tr>';
    statusRow += '<td></td></tr>';
    bearingRow += '<td>°</td></tr>';
    rangeRow += '<td>NM</td></tr>';
    courseRow += '<td>°</td></tr>';
    speedRow += '<td>KT</td></tr>';
    cpaRow += '<td>NM</td></tr>';
    tcpaRow += '<td>MIN</td></tr>';
    bcrRow += '<td>NM</td></tr>';
    bctRow += '<td>MIN</td></tr>';
    tableHTML += idRow;
    tableHTML += statusRow;
    tableHTML += bearingRow;
    tableHTML += rangeRow;
    tableHTML += courseRow;
    tableHTML += speedRow;
    tableHTML += cpaRow;
    tableHTML += tcpaRow;
    tableHTML += bcrRow;
    tableHTML += bctRow;
    tableHTML += '</table>';
    return tableHTML
  }
</script>
