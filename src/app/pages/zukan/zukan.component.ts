 import { Component, OnInit } from '@angular/core';
  import { DataService } from '../../shared/data.service';
  import { getRegionName, REGION_NAMES } from '../../shared/region';

  @Component({
    selector: 'app-zukan',
    templateUrl: './zukan.component.html',
    styleUrls: ['./zukan.component.scss']
  })
  export class ZukanComponent implements OnInit {
    regions = REGION_NAMES;
    selectedRegion = REGION_NAMES[0];
    allPokemon: any[] = [];
    filteredPokemon: any[] = [];

    constructor(private dataService: DataService) {}

    ngOnInit(): void {
      this.dataService.import().subscribe((json: any) => {
        this.allPokemon = json;
        this.applyFilter();
      });
    }

    selectRegion(region: string): void {
      this.selectedRegion = region;
      this.applyFilter();
    }

    private applyFilter(): void {
      this.filteredPokemon = this.allPokemon.filter(
        (p) => getRegionName(p.no) === this.selectedRegion
      );
    }
  }


