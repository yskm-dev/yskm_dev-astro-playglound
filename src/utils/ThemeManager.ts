// ThemeManager.ts

// テーマを管理するシングルトンクラス
class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: "system" | "light" | "dark" = "system";
  private handleMediaQueryChange: (e: MediaQueryListEvent) => void;

  // シングルトンインスタンスを取得するメソッド
  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  // コンストラクタはprivateにして外部からのインスタンス化を防ぐ
  private constructor() {
    this.initialize();

    this.handleMediaQueryChange = (e: MediaQueryListEvent) =>
      this._handleMediaQueryChange(e);

    // メディアクエリの変更を監視
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", this.handleMediaQueryChange);
  }

  // 初期化メソッド
  private initialize(): void {
    const savedTheme: string | null = localStorage.getItem("theme");
    const theme =
      savedTheme === "dark" || savedTheme === "light" ? savedTheme : "system";
    document.documentElement.setAttribute("data-theme", theme);
  }

  // メディアクエリの変更を処理するメソッド
  private _handleMediaQueryChange(e: MediaQueryListEvent): void {
    if (e.matches) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  // themeの更新メソッド
  public updateTheme(theme: "light" | "dark") {
    this.currentTheme = theme;
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }

  // get: 現在のテーマ取得用のゲッター
  get getTheme(): "system" | "light" | "dark" {
    return this.currentTheme;
  }
}

export default ThemeManager.getInstance();
