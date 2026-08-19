import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { ConfirmService } from '../../shared/modal/confirm.service';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

  export class QuizComponent {
    form!: FormGroup;
    data: any;
    question!: string; 
    answer1!: string; 
    answer2!: string; 
    answer3!: string; 
    answer4!: string; 
    imageUrl!: string;
    backgroundImages = [
    'https://collabo-cafe.com/wp-content/uploads/aeee04c129c48ffc68a634ce9b7dd556.jpg',
    'https://collabo-cafe.com/wp-content/uploads/4f80c69f317695ae019d04ff6568472a.jpg',
    'https://collabo-cafe.com/wp-content/uploads/91424047795bc9f4990e3ac1cbc244fc.jpg',
    'https://collabo-cafe.com/wp-content/uploads/0620536035dd595646c9ca0ef01bd758.jpg',
    'https://collabo-cafe.com/wp-content/uploads/828c83d5e5b06c392618410755b966ac.jpg',
    'https://collabo-cafe.com/wp-content/uploads/18d69600f026a7997c32f84085d02890.jpg',
    'https://collabo-cafe.com/wp-content/uploads/e04d2c4327449f2d5dfddcc06a730b6c.jpg'
    ];
    backgroundUrl!: string;
    color1 = 'btn-info';
    color2 = 'btn-danger';
    color3 = 'btn-success';
    color4 = 'btn-warning';
    correctAnswer!: string; 
    isLoading = false;

    register(selected: string): void {
      const isCorrect = selected === this.correctAnswer;
      const bsModalRef = this.confirmService.show(isCorrect);

    bsModalRef.onHidden!.subscribe(() => {
      this.loadQuestion();
    });
    }

    loadQuestion(): void {    
      this.isLoading = true;  
      
      this.data.subscribe((json: any) => {
        const randomIndex = Math.floor(Math.random() * json.length);
        const pokemon = json[randomIndex];
        this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon['no']}.png`;
        const generationIndex = this.getGenerationIndex(pokemon['no']);
        this.backgroundUrl = this.backgroundImages[generationIndex];
        this.backgroundUrl = 'https://wallpaper.forfun.com/fetch/38/38c62201e6446dda29e0b1768ccc689f.jpeg';
        const correctAnswer = pokemon['name'];
        this.correctAnswer = correctAnswer;

        const dummyAnswers: string[] = [];
        while (dummyAnswers.length < 3) {
          const dummyIndex = Math.floor(Math.random() * json.length);
          const dummyAnswer = json[dummyIndex]['name'];

          if (dummyAnswer !== correctAnswer && !dummyAnswers.includes(dummyAnswer)) {
            dummyAnswers.push(dummyAnswer);
          }
        }
        const answers = [correctAnswer, ...dummyAnswers];
        answers.sort(() => Math.random() - 0.5);
        this.answer1 = answers[0];
        this.answer2 = answers[1];
        this.answer3 = answers[2];
        this.answer4 = answers[3];

        this.question = 'このポケモンのなまえは？';

        this.form.patchValue({
          number: pokemon['no'],
          name: pokemon['name'],
          types: pokemon['types'].join(','),
          abilities: pokemon['abilities'].join(','),
          hiddenAbilities: pokemon['hiddenAbilities'].join(','),
          evolutions: pokemon['evolutions'].length > 0 ? 'する' : 'しない',
          status: pokemon['status']
        });
        this.isLoading = false;   
      });
    }

    getGenerationIndex(no: number): number {
    if (no <= 151) return 0;
    if (no <= 251) return 1;
    if (no <= 386) return 2;
    if (no <= 493) return 3;
    if (no <= 649) return 4;
    if (no <= 721) return 5;
    return 6;
    }

    constructor(private fb: FormBuilder, private dataService: DataService, private confirmService: ConfirmService) {
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
      this.loadQuestion();   
    }
  }
