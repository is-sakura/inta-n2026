import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../shared/data.service';

/** 画面がいまどの段階にあるかを表す */
type GetQuizStage = 'question' | 'vote' | 'ball' | 'result' | 'finished';

interface CaughtPokemon {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-get-quiz',
  templateUrl: './get-quiz.component.html',
  styleUrls: ['./get-quiz.component.scss']
})
export class GetQuizComponent {
  /** ゲットするポケモンの目標数（3匹で終了画面へ） */
  private readonly GET_TARGET = 3;
  /** ボールが揺れる演出の時間（ミリ秒） */
  private readonly BALL_SHAKE_MS = 3500;

  private allPokemon: any[] = [];

  isLoading = false;
  stage: GetQuizStage = 'question';
  backgroundUrl = 'https://www.pokemon.jp/special/yadon_paradise/wallpaper/download/pc_1280_768minigame.jpg';

  question = '';
  imageUrl = '';
  answer1 = '';
  answer2 = '';
  answer3 = '';
  answer4 = '';
  correctAnswer = '';

  selectedAnswer: string | null = null;
  isCorrectSelection = false;

  voteForm: FormGroup;

  isBallShaking = false;
  isGetSuccess: boolean | null = null;
  expectedRate = 0;

  caughtPokemon: CaughtPokemon[] = [];

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.voteForm = this.fb.group({
      totalCount: [10, [Validators.required, Validators.min(1)]],
      votedCount: [0, [Validators.required, Validators.min(0)]]
    });

    this.isLoading = true;
    this.dataService.import().subscribe((json: any) => {
      this.allPokemon = json;
      this.loadQuestion();
    });
  }

  /** 次の問題用に、ランダムなポケモンと4択の選択肢を作る */
  loadQuestion(): void {
    const json = this.allPokemon;
    const randomIndex = Math.floor(Math.random() * json.length);
    const pokemon = json[randomIndex];

    this.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon['no']}.png`;
    this.correctAnswer = pokemon['name'];

    const dummyAnswers: string[] = [];
    while (dummyAnswers.length < 3) {
      const dummyIndex = Math.floor(Math.random() * json.length);
      const dummyAnswer = json[dummyIndex]['name'];
      if (dummyAnswer !== this.correctAnswer && !dummyAnswers.includes(dummyAnswer)) {
        dummyAnswers.push(dummyAnswer);
      }
    }
    const answers = [this.correctAnswer, ...dummyAnswers];
    answers.sort(() => Math.random() - 0.5);
    [this.answer1, this.answer2, this.answer3, this.answer4] = answers;

    this.question = 'このポケモンは　だれだ！？';
    this.stage = 'question';
    this.selectedAnswer = null;
    this.isGetSuccess = null;
    this.voteForm.reset({ totalCount: 10, votedCount: 0 });
    this.isLoading = false;
  }

  /** 選択肢を選んだときの処理。正解なら投票入力へ、不正解ならその場で結果表示へ */
  selectAnswer(selected: string): void {
    this.selectedAnswer = selected;
    this.isCorrectSelection = selected === this.correctAnswer;

    if (this.isCorrectSelection) {
      this.stage = 'vote';
    } else {
      this.isGetSuccess = false;
      this.stage = 'result';
    }
  }

  /** 「全体の人数」「選んだ人数」が正しく入力されているか */
  get canAttemptGet(): boolean {
    if (!this.voteForm.valid) {
      return false;
    }
    const { totalCount, votedCount } = this.voteForm.value;
    return totalCount > 0 && votedCount >= 0 && votedCount <= totalCount;
  }

  /**
   * 多数決ゲットシステムの本体。
   * (選んだ人数 ÷ 全体の人数) × 100 をゲット期待値（％）とし、
   * その確率でゲット成功/失敗を判定する。
   */
  attemptGet(): void {
    if (!this.canAttemptGet) {
      return;
    }
    const { totalCount, votedCount } = this.voteForm.value;
    this.expectedRate = Math.min(100, (votedCount / totalCount) * 100);

    this.stage = 'ball';
    this.isBallShaking = true;

    setTimeout(() => {
      this.isBallShaking = false;

      const roll = Math.random() * 100;
      const success = roll < this.expectedRate;
      this.isGetSuccess = success;
      this.stage = 'result';

      if (success) {
        this.caughtPokemon.push({ name: this.correctAnswer, imageUrl: this.imageUrl });
        if (this.caughtPokemon.length >= this.GET_TARGET) {
          this.stage = 'finished';
        }
      }
    }, this.BALL_SHAKE_MS);
  }

  /** 「次の問題へ」ボタン */
  next(): void {
    if (this.stage === 'finished') {
      return;
    }
    this.loadQuestion();
  }

  /** 終了画面から、ゲット状況をリセットして再スタートする */
  restart(): void {
    this.caughtPokemon = [];
    this.loadQuestion();
  }
}

