import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { DataService } from '../../shared/data.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

  export class QuizComponent {
    form!: FormGroup;
    data: any;

    constructor(private fb: FormBuilder, private dataService: DataService) {
      this.form = this.fb.group({
        number: [null],
        name: [null],
        types: [null],
        abilities: [null],
        hiddenAbilities: [null],
        evolutions: [null],
        status: [null]
      });

      this.data = this.dataService.import();

        this.data.subscribe((json: any) => {
          const randomIndex = Math.floor(Math.random() * json.length);
          const pokemon = json[randomIndex];
          const correctAnswer = pokemon['abilities'][0];
          
          const dummyAnswers: string[] = [];
          while (dummyAnswers.length < 3) {
            const dummyIndex = Math.floor(Math.random() * json.length);
            const dummyAnswer = json[dummyIndex]['abilities'][0];

            if (dummyAnswer !== correctAnswer && !dummyAnswers.includes(dummyAnswer)) {
              dummyAnswers.push(dummyAnswer);
            }
          }
          const answers = [correctAnswer, ...dummyAnswers];
          answers.sort(() => Math.random() - 0.5);
          const answer1 = answers[0];
          const answer2 = answers[1];
          const answer3 = answers[2];
          const answer4 = answers[3];
          const questionText = 'このポケモンのとくせいは？';


          this.form.patchValue({
            number: pokemon['no'],
            name: pokemon['name'],
            types: pokemon['types'].join(','),
            abilities: pokemon['abilities'].join(','),
            hiddenAbilities: pokemon['hiddenAbilities'].join(','),
            evolutions: pokemon['evolutions'].length > 0 ? 'する' : 'しない',
            status: pokemon['status']
          });
        });
    }
  }

