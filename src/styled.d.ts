// 이전에 설치한 @type/styled-components 파일에 추가/override할 내용을 넣는 파일
// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
        cardColor: string;
        inactiveColor: string;
    }
}

