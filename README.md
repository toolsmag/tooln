# Tooln

Tooln 매거전을 위한 웹퍼블리싱 작업페이지입니다. 해당 작업물은 HTML, SCSS(CSS),  JAVASCRIPT를 사용하여 만들어졌으며, Webpack을 활용화여 번들링(압축 및 최적화)된 최종결과물을 dist 폴더 내에 생성합니다. 즉, dist폴더 내에 생성된 파일이 FTP에 업로드될 파일입니다.

계약시 말씀드린것과 같이 최종생성된 결과물은 크롬, 파이어폭스, 사파리, 엣지에 최적화되어 있습니다.(인터넷익스플로러와 같은 구브라우저에서는 구동되지 않을 수 있습니다)



## 마크업 페이지

해당 페이지들은 디자인검수 및 개발검수를 위해 임시적으로 생성된 페이지 입니다. 실제 페이지가 아니며 추후 상황에 따라 접속되지 않을 수 있습니다.

* 메인: https://toolsmag.github.io/tooln/dist/
* 어바웃: https://toolsmag.github.io/tooln/dist/about.html
* 아티클: https://toolsmag.github.io/tooln/dist/article.html?temp



## 폴더구조 

```
.
├── .vscode
├── app
│  ├── src
│  │  ├── font                  // AkzidenzGrotesk / WarnockPro
│  │  ├── img                           
│  │  ├── js                    // 자바스크립트
│  │  ├── json                  // DB대신 사용할 아티클 데이터
│  │  ├── scss                  // style 정의
│  │  └── templates             // header/footer등의 공통적으로 사용되는 html
│  │  
│  ├── about.html               // Tooln의 어바웃페이지
│  ├── article.html             // Tooln의 아티클페이지
│  └── main.html                // Tooln의 메인페이지(index.html)
│     
├── dist                        // 최종 번들링된 FTP에 업로드될 결과물
├── issues                      // 디자인검수사항, README, 버그확인을 위한 이미지들
├── .gitignore
├── package-lock.json
├── README.md
└── webpack.config.js
```



## 기타 가이드

개발환경세팅 등 기타 가이드

* 개발환경세팅
* 페이지 수정/개발 최종산출물 생성
* 아티클 리스트 추가 및 아티클페이지 생성
