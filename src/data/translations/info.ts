import type { InfoPage, PageContent } from '../info';
import type { ExtraLanguage } from '../locales';
const email = { label: 'henuqin@gmail.com', href: 'mailto:henuqin@gmail.com' };
const repo = 'https://github.com/cutelitchi/Vela';
const cf = 'https://www.cloudflare.com/privacypolicy/';
const google = 'https://policies.google.com/privacy';
const github = 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement';
const googleAds = 'https://policies.google.com/technologies/partner-sites';
const choices = 'https://myadcenter.google.com/';
const thirdParty = 'https://www.aboutads.info/choices/';

export const extraInfo: Record<ExtraLanguage, Record<InfoPage, PageContent>> = {
  ja: {
    about: {
      title: 'PicSizeKitについて — ローカル画像ツール', description: 'PicSizeKitは、ブラウザーで画像のリサイズ、切り抜き、圧縮、変換、枠追加を行う独立プロジェクトです。目的と利用上の制限をご案内します。', intro: '日々の画像編集を、あなたの端末で。必要な機能をまとめた小さなツールです。',
      sections: [
        { heading: '独立したプロジェクト', paragraphs: ['PicSizeKitはGitHubのcutelitchi/Velaで管理される独立した画像ツールです。共有やウェブサイトなどに使う写真を、アカウント登録なしで準備できます。'], links: [{ label: 'プロジェクトと更新履歴', href: repo }] },
        { heading: 'できること', paragraphs: ['ピクセル数や割合によるリサイズ、比率指定の切り抜き、JPEG・PNG・WebPの変換と品質調整に対応します。直角の枠をプリセット色やRGBで追加し、出力サイズを比較して個別またはZIPで保存できます。'] },
        { heading: '端末内で処理する理由', paragraphs: ['画像の読み込みと編集はブラウザー内で行います。処理のために画像をPicSizeKitへアップロードしません。ただしページの取得には通信が必要です。ホスティングなどのデータ処理はプライバシーポリシーで説明しています。'] },
        { heading: '利用上の制限', paragraphs: ['大きな画像や大量の処理は端末のメモリーとブラウザーに制約されます。出力は静止画で、アニメーションは保持しません。拡大で失われた細部は復元できません。証明写真プリセットは比率の設定用なので、提出先の画素数や書類要件も確認してください。'] },
        { heading: '改善へのご協力', paragraphs: ['不具合や提案をお寄せください。操作内容と期待した結果を説明し、必要なら個人情報を含まない見本画像をご使用ください。'], links: [{ label: '管理者に連絡する', href: '/ja/contact/' }] },
      ],
    },
    contact: {
      title: 'お問い合わせ — PicSizeKit', description: 'PicSizeKitのサポート、ご提案、プライバシーに関するお問い合わせはメールで受け付けます。公開の不具合報告にはGitHub Issuesも利用できます。', intro: '不具合やアイデアがあれば、プロジェクト管理者までご連絡ください。',
      sections: [
        { heading: 'メールで連絡', paragraphs: ['サポート、提案、プライバシーに関する質問は下記へお送りください。リンクはメールアプリを開きます。このサイトに送信フォームはありません。'], links: [email] },
        { heading: '公開の不具合報告', paragraphs: ['cutelitchi/VelaのIssuesで既存の報告を確認できます。新規投稿にはGitHubへのログインが必要です。'], links: [{ label: 'GitHub Issuesを開く', href: `${repo}/issues` }] },
        { heading: '報告に含める情報', paragraphs: ['端末、ブラウザー、使用ツール、再現手順、期待する結果を記載してください。画像形式やおおよその寸法も役立ちます。必要な見本には個人情報のない画像を使用してください。'] },
        { heading: 'プライバシーに関する質問', paragraphs: ['プライバシーに関する依頼はメールをご利用ください。必要な情報だけを共有してください。GitHub Issuesは公開されるため、私的な写真、身分証明書、パスワード、アクセストークンなどを投稿しないでください。'], links: [email, { label: 'プライバシーポリシー', href: '/ja/privacy/' }] },
        { heading: '返信について', paragraphs: ['独立プロジェクトのため、管理者が対応可能な範囲で確認します。返信期限の保証はありません。既知の問題や更新もご確認ください。'] },
      ],
    },
    privacy: {
      title: 'プライバシーポリシー | PicSizeKit', description: 'PicSizeKitの画像処理、ウェブへのアクセス、メールでの問い合わせ、広告に関するデータの取り扱いと、利用者の選択について説明します。', intro: '本ポリシーはpicsizekit.comに適用されます。端末内に残る情報と、サイトへのアクセス時に扱われる情報を説明します。',
      sections: [
        { heading: '運営について', paragraphs: ['PicSizeKitはGitHubのcutelitchi/Velaを通じて管理される独立プロジェクトです。本ポリシーへの質問はお問い合わせページの連絡先へお寄せください。'], links: [{ label: 'お問い合わせ', href: '/ja/contact/' }] },
        { heading: '画像と編集データ', paragraphs: ['選択した画像、ファイル名、寸法、選択範囲、出力画像はブラウザー内で編集に使用します。編集機能はこれらのファイルや内容をPicSizeKitや画像ホスティングサービスへ送信しません。', '一時的なブラウザーメモリーと画像URLを使用し、クラウド保存やサーバーからの復元は提供しません。ページを閉じるか再読み込みすると編集セッションは終了します。保存したファイルは自分で削除するまで端末に残ります。', '初期設定では出力からEXIF情報を削除します。JPEGからJPEGの場合は保持も選べるため、共有前に設定を確認してください。'] },
        { heading: 'ページ配信とアクセス情報', paragraphs: ['Cloudflareがサイトをホスト・配信します。ページ取得時にはIPアドレス、URL、ブラウザー情報、時刻などの接続情報が配信基盤へ送られます。Cloudflareは配信と保護のために技術・セキュリティ情報を処理する場合があります。これは画像内容のアップロードとは別です。', '基盤データの保存期間や国外での処理は提供事業者の規定に従います。当方は事業者管理の記録について固定の保存期間を約束しません。'], links: [{ label: 'Cloudflareのプライバシーポリシー', href: cf }] },
        { heading: 'Cookie・ローカル保存・解析', paragraphs: ['現在の編集機能は広告・解析Cookieを設定せず、画像をlocalStorageに保存しません。言語はURLで決まります。旧版の言語設定picsizekit-language-v2は現在読み込まれません。ブラウザーのサイトデータ設定で削除できます。', '配信やセキュリティ機能は事業者の規定に従って必要な技術的保存領域を利用する場合があります。現在のアプリには第三者解析スクリプトを組み込んでいません。'] },
        { heading: '広告と選択肢', paragraphs: ['下記更新日時点でads.txt承認ファイルは公開していますが、Google AdSense広告スクリプトは読み込んでいません。ads.txt自体は広告を表示せず、広告Cookieを設定しません。', 'Google広告を有効にした場合、Googleを含む第三者は、このサイトや他サイトへの過去の訪問に基づく広告配信にCookieを使うことがあります。Googleとそのパートナーは広告Cookieで広告をパーソナライズできます。GoogleマイアドセンターやAboutAdsで選択肢を確認できます。', '広告開始前に実際のサービスに合わせてポリシーを更新し、必要な通知と同意管理を提供します。同意が必要な場合は利用者の選択に従います。本ページだけでは同意を取得しません。'], links: [{ label: 'Googleによるパートナーサイトの情報利用', href: googleAds }, { label: 'マイアドセンター', href: choices }, { label: '第三者広告の選択肢', href: thirdParty }] },
        { heading: 'お問い合わせと外部リンク', paragraphs: ['henuqin@gmail.comへ送信すると、管理者は返信のためにメールアドレス、本文、添付ファイルを受け取ります。Gmailを使用しており、Googleの関連規定が適用されます。削除しない限りメールは窓口のメールボックスに残ります。通信内容の削除はメールで依頼できます。事業者側の記録とバックアップはその規定に従います。必要な情報だけを送ってください。', 'GitHub Issuesに投稿した情報は対応のため管理者が閲覧します。投稿と添付は公開され、保存・削除はGitHubの仕組みに従います。機密情報を投稿しないでください。外部リンク先ではそのサービスの規定が適用されます。'], links: [email, { label: 'Googleのプライバシーポリシー', href: google }, { label: 'GitHubのプライバシー声明', href: github }] },
        { heading: '利用者の操作と変更', paragraphs: ['ブラウザーのサイトデータを消去し、編集画面を閉じ、ダウンロードを端末から削除できます。処理した画像のサーバーコピーはないため、当方での取得・削除はできません。問い合わせで提供した情報については、機密情報を公開せずに管理者へ連絡してください。', '取り扱いを変更した場合は本ページを更新します。下記の日付は最終改訂日です。'] },
      ],
    },
  },
  es: {
    about: {
      title: 'Acerca de PicSizeKit — Herramientas de imagen locales', description: 'Conoce PicSizeKit, un proyecto independiente para redimensionar, recortar, comprimir, convertir y enmarcar imágenes directamente en tu navegador.', intro: 'Pequeñas herramientas para las imágenes de cada día, con el procesamiento en tu dispositivo.',
      sections: [
        { heading: 'Un proyecto independiente', paragraphs: ['PicSizeKit se mantiene a través del proyecto cutelitchi/Vela en GitHub. Ayuda a preparar fotos para compartir, publicar en sitios web y otras tareas sin crear una cuenta.'], links: [{ label: 'Proyecto y actualizaciones', href: repo }] },
        { heading: 'Qué puedes hacer', paragraphs: ['Cambia el tamaño en píxeles o porcentaje, recorta con proporciones predefinidas o personalizadas, convierte JPEG, PNG y WebP y ajusta la calidad. Añade bordes rectos con colores predefinidos o RGB, compara tamaños y descarga archivos individuales o un ZIP.'] },
        { heading: 'Por qué procesar localmente', paragraphs: ['El navegador decodifica y edita las imágenes. No se suben a PicSizeKit para procesarlas. Cargar las páginas sí requiere una conexión; la política de privacidad explica por separado los datos del alojamiento y otros servicios.'] },
        { heading: 'Límites prácticos', paragraphs: ['Las imágenes y los lotes grandes dependen de la memoria y del navegador. La salida es estática y no conserva animaciones. Ampliar una foto no recupera detalles perdidos. Los ajustes de fotos de identificación fijan proporciones: comprueba los píxeles y requisitos de la entidad receptora.'] },
        { heading: 'Ayúdanos a mejorar', paragraphs: ['Los informes de errores y las sugerencias orientan las mejoras. Explica qué intentabas hacer y el resultado esperado. Si necesitas una imagen de ejemplo, usa una sin información sensible.'], links: [{ label: 'Contactar con el responsable', href: '/es/contact/' }] },
      ],
    },
    contact: {
      title: 'Contacto y soporte | PicSizeKit', description: 'Contacta por correo con PicSizeKit para recibir soporte, enviar sugerencias o consultas de privacidad. Usa GitHub Issues para informar de errores públicamente.', intro: '¿Has encontrado un problema o tienes una idea? Contacta con el responsable del proyecto.',
      sections: [
        { heading: 'Contacto por correo', paragraphs: ['Envía tus consultas de soporte, sugerencias o solicitudes de privacidad a la dirección siguiente. El enlace abre tu aplicación de correo. Este sitio no tiene formulario de contacto.'], links: [email] },
        { heading: 'Informes públicos', paragraphs: ['También puedes consultar los Issues de cutelitchi/Vela. Para crear un informe nuevo debes iniciar sesión en GitHub.'], links: [{ label: 'Abrir GitHub Issues', href: `${repo}/issues` }] },
        { heading: 'Qué incluir en un informe', paragraphs: ['Indica dispositivo, navegador, herramienta utilizada, pasos para reproducir el problema y resultado esperado. El formato y las dimensiones aproximadas de la imagen ayudan. Usa archivos de prueba sin datos personales.'] },
        { heading: 'Consultas de privacidad', paragraphs: ['Usa el correo para solicitudes de privacidad y comparte solo lo necesario. Los Issues de GitHub son públicos: no publiques fotos privadas, documentos de identidad, contraseñas, tokens ni otra información sensible.'], links: [email, { label: 'Leer la política de privacidad', href: '/es/privacy/' }] },
        { heading: 'Respuestas', paragraphs: ['PicSizeKit es independiente. El responsable atiende los informes según su disponibilidad y no garantiza un plazo de respuesta. Consulta los problemas conocidos y las actualizaciones antes de enviar un informe.'] },
      ],
    },
    privacy: {
      title: 'Política de privacidad | PicSizeKit', description: 'Cómo trata PicSizeKit las imágenes locales, las visitas al sitio, los mensajes y la publicidad. Consulta tus opciones y las políticas de servicios externos.', intro: 'Esta política se aplica a picsizekit.com y explica qué permanece en tu dispositivo y qué ocurre cuando visitas el sitio.',
      sections: [
        { heading: 'Responsable del sitio', paragraphs: ['PicSizeKit es un proyecto independiente mantenido a través de cutelitchi/Vela en GitHub. Para consultas sobre esta política, utiliza el canal de la página de contacto.'], links: [{ label: 'Contacto', href: '/es/contact/' }] },
        { heading: 'Imágenes y datos de edición', paragraphs: ['Las imágenes seleccionadas, nombres de archivo, dimensiones, recortes y resultados se utilizan localmente en el navegador. El editor no sube esos archivos ni su contenido a PicSizeKit ni a un servicio de alojamiento de imágenes.', 'Se utilizan memoria y direcciones temporales del navegador. No ofrecemos almacenamiento en la nube ni recuperación desde un servidor. Cerrar o recargar termina la sesión; los archivos descargados permanecen en tu dispositivo hasta que los elimines.', 'Los datos EXIF se eliminan por defecto. Puedes conservarlos al procesar JPEG a JPEG. Revisa este ajuste antes de compartir una foto.'] },
        { heading: 'Alojamiento y datos de las solicitudes', paragraphs: ['Cloudflare aloja y distribuye el sitio. Al cargar páginas se envían datos de conexión, como IP, URL solicitada, información del navegador y hora, a la infraestructura. Cloudflare puede tratar datos técnicos y de seguridad para prestar y proteger el servicio. Esto es distinto del contenido de tus imágenes, que el editor no sube.', 'La conservación y el tratamiento internacional de datos de infraestructura dependen de las políticas del proveedor. No fijamos un plazo de conservación para registros controlados por él.'], links: [{ label: 'Privacidad de Cloudflare', href: cf }] },
        { heading: 'Cookies, almacenamiento y analítica', paragraphs: ['El editor actual no establece cookies publicitarias o analíticas ni guarda imágenes en localStorage. El idioma depende de la URL. Una versión anterior guardaba picsizekit-language-v2; ya no se lee y puedes eliminarlo desde los datos del sitio en el navegador.', 'Las funciones de alojamiento o seguridad pueden usar almacenamiento técnico necesario según las políticas del proveedor. La aplicación no incluye actualmente scripts analíticos de terceros.'] },
        { heading: 'Publicidad y opciones', paragraphs: ['En la fecha indicada abajo publicamos un archivo de autorización ads.txt, pero la aplicación no carga el script publicitario de Google AdSense. El archivo ads.txt por sí solo no muestra anuncios ni establece cookies.', 'Si se activa la publicidad de Google, proveedores externos, incluido Google, pueden usar cookies para mostrar anuncios basados en visitas anteriores a este u otros sitios. Google y sus socios pueden personalizarlos mediante cookies publicitarias. Puedes gestionar la personalización en Mi centro de anuncios de Google y consultar opciones de exclusión de terceros en AboutAds.', 'Antes de activar anuncios actualizaremos la política según los servicios utilizados y proporcionaremos los avisos y controles de consentimiento necesarios. Donde se requiera, los anuncios estarán sujetos a tus decisiones. Esta política por sí sola no recoge consentimiento.'], links: [{ label: 'Uso de información por Google en sitios asociados', href: googleAds }, { label: 'Mi centro de anuncios', href: choices }, { label: 'Opciones de anuncios de terceros', href: thirdParty }] },
        { heading: 'Mensajes y enlaces externos', paragraphs: ['Al escribir a henuqin@gmail.com, el responsable recibe tu dirección, mensaje y adjuntos para atender la solicitud. El buzón usa Gmail y se aplican las políticas de Google. Los mensajes permanecen hasta que se eliminan; puedes solicitar por correo la eliminación de tu correspondencia. Los registros y copias controlados por el proveedor siguen sus reglas. Envía solo lo necesario.', 'Al publicar un Issue de GitHub, el responsable puede leer lo que proporcionas para responder. Los Issues y adjuntos son públicos y dependen de los controles de conservación y borrado de GitHub. No publiques datos sensibles. Los enlaces externos llevan a servicios con prácticas propias.'], links: [email, { label: 'Privacidad de Google', href: google }, { label: 'Privacidad de GitHub', href: github }] },
        { heading: 'Tus controles y cambios', paragraphs: ['Puedes borrar los datos del sitio, cerrar el editor y eliminar las descargas desde tu dispositivo. PicSizeKit no tiene copias de las imágenes procesadas en el servidor que pueda recuperar o borrar. Para consultas sobre datos enviados en mensajes, contacta sin publicarlos.', 'Actualizaremos esta página si cambian nuestras prácticas. La fecha siguiente indica la última revisión.'] },
      ],
    },
  },
  'zh-Hant': {
    about: {
      title: '關於 PicSizeKit — 本機圖片處理工具', description: '認識 PicSizeKit 獨立圖片工具專案，在瀏覽器內完成縮放、裁切、壓縮、格式轉換和加入邊框，了解功能與使用限制。', intro: '專注日常圖片處理的小工具，讓編輯工作留在你的裝置上。',
      sections: [
        { heading: '一個獨立專案', paragraphs: ['PicSizeKit 是透過 GitHub 上 cutelitchi/Vela 專案維護的獨立圖片工具，協助使用者為分享、網站及日常用途準備照片，無須建立帳戶。'], links: [{ label: '查看專案與更新', href: repo }] },
        { heading: '可以完成哪些工作', paragraphs: ['依像素或百分比縮放、依常見或自訂比例裁切、轉換 JPEG、PNG、WebP 並調整品質。也可加入預設配色或自訂 RGB 的直角邊框、比較輸出容量，單張下載或批次打包 ZIP。'] },
        { heading: '為什麼採用本機處理', paragraphs: ['編輯器在瀏覽器內解碼及處理所選圖片，不會將圖片內容上傳到 PicSizeKit。載入網頁仍需要網路連線；隱私權政策另行說明託管與其他資料處理。'] },
        { heading: '使用限制', paragraphs: ['大型圖片及批次的處理能力取決於裝置記憶體與瀏覽器。輸出為靜態圖片，不保留動畫；放大無法還原遺失細節。證件照預設用於設定裁切比例，請另行核對接收機構的像素及文件要求。'] },
        { heading: '協助我們改進', paragraphs: ['問題回報與功能建議有助於改善工具。請說明操作目標及預期結果，必要時使用不含隱私的範例圖片。'], links: [{ label: '聯絡維護者', href: '/zh-hant/contact/' }] },
      ],
    },
    contact: {
      title: '聯絡 PicSizeKit — 問題回報與支援', description: '透過電子郵件聯絡 PicSizeKit 維護者，取得支援、提交建議及隱私請求，也可透過 GitHub Issues 公開回報問題。', intro: '發現問題或有新的想法？歡迎透過以下管道聯絡專案維護者。',
      sections: [
        { heading: '電子郵件聯絡', paragraphs: ['需要支援、提出建議或詢問隱私問題時，請寄信至下方信箱。連結會開啟郵件應用程式；本站沒有線上聯絡表單。'], links: [email] },
        { heading: '公開問題回報', paragraphs: ['你也可使用 cutelitchi/Vela 的公開 Issues 頁面查看已有回報，或登入 GitHub 建立新問題。'], links: [{ label: '開啟 GitHub Issues', href: `${repo}/issues` }] },
        { heading: '回報時請說明', paragraphs: ['請提供裝置、瀏覽器、使用工具、重現步驟及預期結果。圖片格式與大致尺寸也有助於排查。必要時請使用不含個人資訊的測試圖片。'] },
        { heading: '隱私相關問題', paragraphs: ['隱私請求請透過電子郵件聯絡，僅提供描述問題所需的資訊。GitHub Issues 對外公開，請勿發布私人照片、身分證件、密碼、存取權杖或其他敏感資訊。'], links: [email, { label: '閱讀隱私權政策', href: '/zh-hant/privacy/' }] },
        { heading: '回覆說明', paragraphs: ['PicSizeKit 是獨立專案，維護者會在時間允許時處理，不承諾固定回覆期限。提交前可先查看既有問題及更新紀錄。'] },
      ],
    },
    privacy: {
      title: '隱私權政策 | PicSizeKit', description: '了解 PicSizeKit 如何處理本機圖片、網頁存取、電子郵件回報及廣告相關資料，以及使用者選擇與第三方服務。', intro: '本政策適用於 picsizekit.com，說明哪些內容留在你的裝置上，以及造訪網站時可能發生的資料處理。',
      sections: [
        { heading: '網站維護者', paragraphs: ['PicSizeKit 是透過 GitHub 上 cutelitchi/Vela 維護的獨立專案。對本政策有疑問時，請使用聯絡頁面列出的管道。'], links: [{ label: '聯絡維護者', href: '/zh-hant/contact/' }] },
        { heading: '圖片與編輯資料', paragraphs: ['所選圖片、檔案名稱、尺寸、裁切範圍及輸出圖片在瀏覽器本機用於提供編輯功能。編輯器不會將這些檔案或內容上傳到 PicSizeKit 或圖片託管服務。', '編輯器使用暫存記憶體及圖片網址，不提供雲端儲存或伺服器復原。關閉或重新整理頁面會結束編輯工作階段；已下載的檔案留在裝置上，直到你自行刪除。', '預設移除輸出圖片的 EXIF 中繼資料。JPEG 轉 JPEG 時可選擇保留，分享前請檢查設定。'] },
        { heading: '網頁分發與存取資料', paragraphs: ['網站由 Cloudflare 託管及分發。載入網頁會將 IP 位址、請求網址、瀏覽器資訊及時間等連線資訊傳送至託管基礎設施。Cloudflare 可能處理提供與保護服務所需的技術及安全資料。這與圖片內容不同，編輯器不會上傳圖片內容。', '基礎設施資料的處理、保留及跨境處理適用服務提供者的政策。我們不為提供者控制的紀錄承諾固定保留期限。'], links: [{ label: 'Cloudflare 隱私權政策', href: cf }] },
        { heading: 'Cookie、本機儲存與統計', paragraphs: ['目前編輯器不設定廣告或分析 Cookie，也不會將圖片存入 localStorage。介面語言由網址決定。舊版曾以 picsizekit-language-v2 保存語言偏好，目前不再讀取；可透過瀏覽器的網站資料設定刪除。', '託管或安全功能可能依提供者政策使用必要的技術儲存。目前應用程式未接入第三方統計指令碼。'] },
        { heading: '廣告與使用者選擇', paragraphs: ['截至下方更新日期，應用程式已發布 ads.txt 授權檔案，但尚未載入 Google AdSense 廣告指令碼。ads.txt 本身不會顯示廣告或設定廣告 Cookie。', '若啟用 Google 廣告，包含 Google 在內的第三方供應商可能依據先前造訪本站或其他網站的情況，使用 Cookie 提供廣告。Google 及合作夥伴可透過廣告 Cookie 提供個人化廣告。可使用 Google 我的廣告中心管理設定，或透過 AboutAds 查看第三方退出選項。', '啟用廣告前，我們會依實際服務更新本政策，提供適用的告知及同意管理控制。在需要同意的情況下，廣告會遵循你的選擇。隱私權政策頁面本身不會收集同意。'], links: [{ label: 'Google 如何使用合作網站的資訊', href: googleAds }, { label: 'Google 我的廣告中心', href: choices }, { label: '第三方廣告選擇', href: thirdParty }] },
        { heading: '回報與外部連結', paragraphs: ['寄信至 henuqin@gmail.com 後，維護者會收到信箱地址、訊息及附件，用於處理請求與回覆。信箱使用 Gmail，適用 Google 的相關政策。郵件會保留在支援信箱中，除非被刪除；可寄信請求刪除相關通信。服務提供者控制的紀錄及備份依其規則處理，請僅提供必要資訊。', '透過 GitHub 提交 Issue 後，維護者可閱讀你提供的資料以處理回報。問題及附件公開可見，其保留與刪除受 GitHub 的機制約束，請勿發布敏感資訊。外部連結適用對應服務的資料處理規則。'], links: [email, { label: 'Google 隱私權政策', href: google }, { label: 'GitHub 隱私權聲明', href: github }] },
        { heading: '你的選擇與政策更新', paragraphs: ['你可以清除本站的瀏覽器資料、關閉編輯器，並以裝置管理工具刪除下載檔案。PicSizeKit 沒有可供取回或刪除的處理圖片伺服器副本。如需處理透過回報管道提供的資訊，請聯絡維護者，避免公開敏感細節。', '當處理方式改變時，我們會更新本頁面；下方日期為最近修訂時間。'] },
      ],
    },
  },
};
