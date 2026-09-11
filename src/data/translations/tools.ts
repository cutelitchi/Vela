import type { Content, Tool } from '../seo';
import type { ExtraLanguage } from '../locales';

export const extraContent: Record<ExtraLanguage, Record<Tool, Content>> = {
  ja: {
    home: {
      title: '無料の画像リサイズ・切り抜き・圧縮ツール | PicSizeKit',
      description: '画像のサイズ変更、切り抜き、圧縮を無料で。JPG・PNG・WebPの変換、写真の枠追加、一括ダウンロードに対応。アップロードも登録も不要です。',
      headline: '無料の画像リサイズ・圧縮ツール', intro: 'ブラウザーで画像のサイズ変更、切り抜き、変換、枠追加。無料・登録不要で、画像は端末内で処理します。',
      label: 'すべての画像ツール', guideTitle: '画像のサイズを変更するには',
      steps: ['端末からJPG・PNG・WebP画像を選びます。複数選択も可能です。', '比率を選んで切り抜き、ピクセル数または割合で出力サイズを設定します。形式と品質も選べます。', '推定ファイルサイズと解像度を確認し、処理後に画像または一括ZIPをダウンロードします。'],
      tip: '2400 × 1600の切り抜き範囲を50%にすると、枠を付けない場合は1200 × 800になります。全体を残すには選択枠を画像の端まで広げてください。拡大しても失われた細部は復元されません。',
      faqs: [['どの形式を選べばよいですか？', '透明背景が不要な写真にはJPEG、透明背景と可逆圧縮にはPNGが適しています。WebPは透明背景と品質調整に対応しますが、利用先が対応しているか確認してください。'], ['写真はアップロードされますか？', 'いいえ。画像はブラウザー内で処理され、選択したファイルや出力画像はPicSizeKitへ送信されません。ページを閉じる前に保存してください。'], ['メタデータは残せますか？', '初期設定ではEXIF情報を削除します。JPEGからJPEGへの処理では保持する設定に変更できますが、異なる形式への変換では完全な保持を保証しません。']],
    },
    'compress-image': {
      title: '画像を無料で圧縮 — JPG・WebP対応 | PicSizeKit', description: 'ブラウザー内でJPG・WebP画像を圧縮。品質を調整し、ファイルサイズと解像度を比較して個別またはZIPで保存できます。アップロード不要。',
      headline: '画像を無料で圧縮', intro: '品質を調整し、保存前にファイルサイズを比較。画像は端末内にとどまります。', label: '画像圧縮', guideTitle: '画像のファイルサイズを小さくするには',
      steps: ['画像を選択します。初期設定はWebP出力、品質82%、拡大率100%です。', '品質スライダーを動かし、元画像と推定出力を比較します。画素数も減らす場合は拡大率を下げます。', '処理してダウンロードします。複数の画像はZIPにまとめられます。'],
      tip: 'すでに強く圧縮された写真は、再変換で大きくなる場合があります。推定サイズを確認してください。品質の数値は圧縮による容量削減率ではありません。',
      faqs: [['100 KBぴったりに圧縮できますか？', '目標容量を指定する自動調整機能はありません。推定サイズを見ながら品質と画像サイズを調整してください。'], ['圧縮すると解像度も変わりますか？', '初期設定の100%では切り抜き範囲の画素数を維持します。品質だけの変更では画素数は変わりません。切り抜き、リサイズ、枠追加では変わります。'], ['PNGに品質スライダーがないのはなぜですか？', 'PNGは可逆圧縮です。さらに小さくするには画素数を減らすか、WebP・JPEGを選びます。JPEGでは透明背景が失われます。']],
    },
    'webp-to-jpg': {
      title: 'WebPをJPGに無料変換 | PicSizeKit', description: 'WebPをブラウザー内でJPGに変換。JPEG品質の調整、出力容量の比較、一括ダウンロードに対応。無料で登録・アップロード不要。',
      headline: 'WebPをJPGに変換', intro: 'WebP写真を共有しやすいJPEG形式へ。1枚でも複数枚でも端末内で変換できます。', label: 'WebP → JPG', guideTitle: 'WebPをJPGに変換するには',
      steps: ['WebPファイルを選びます。JPEG出力と拡大率100%が選択済みです。', 'JPEG品質と推定サイズを確認します。全体を残すには元の選択範囲を維持してください。', '処理後、JPGファイルまたは変換した画像をまとめたZIPを保存します。'],
      tip: 'JPGとJPEGは同じ形式です。JPEGでは透明部分が白になります。変換後のファイルが大きくなる場合があり、元画像で失われた細部は復元されません。',
      faqs: [['透明背景は残りますか？', 'JPEG出力では白で塗りつぶします。透明度が必要な場合はPNGかWebPを選んでください。'], ['アニメーションWebPに対応していますか？', '出力は静止画です。元ファイルのアニメーションは保持されません。'], ['一括変換できますか？', 'はい。複数ファイルを選択して処理し、ZIPで保存できます。大きな画像や大量の処理は端末のメモリーに制約されます。']],
    },
    'add-border-to-photo': {
      title: '写真に枠を無料で追加 — 色・太さを指定 | PicSizeKit', description: '写真の四辺または上下に角の丸くない枠を追加。8色の落ち着いた配色、RGB指定、ピクセル単位の太さに対応。アップロード不要。',
      headline: '写真に枠を追加', intro: 'ピクセル単位の太さと好みのRGBカラーで写真を縁取り。プレビューしてから保存できます。', label: '写真の枠追加', guideTitle: '写真に枠を付けるには',
      steps: ['写真を選択します。初期設定では四辺に32ピクセルのアイボリーの枠が付きます。', '四辺または上下を選び、スライダーや数値で太さを調整します。色はプリセットまたはRGBで指定できます。', '切り抜き範囲をダブルクリックまたはダブルタップしてシアタープレビューを確認し、処理して保存します。'],
      tip: '枠は画像の外側に追加されます。1200 × 800の画像に四辺32ピクセルの枠を付けると1264 × 864、上下のみなら1200 × 864になります。角は直角です。',
      faqs: [['枠で写真が隠れますか？', 'いいえ。処理後の画像の外側に余白を追加するため、選択範囲を覆いません。最終サイズには枠を含みます。'], ['白や黒の枠も使えますか？', 'RGBを255・255・255にすると白、0・0・0にすると黒です。8色のプリセットも使えます。'], ['映画風の比率にできますか？', '1.85:1、2.35:1、2.39:1などで切り抜き、上下の枠を追加できます。切り抜き比率は画像部分に適用され、枠を追加すると全体の比率は変わります。']],
    },
  },
  es: {
    home: {
      title: 'Redimensionar, recortar y comprimir imágenes gratis | PicSizeKit', description: 'Cambia el tamaño, recorta y comprime imágenes gratis. Convierte JPG, PNG y WebP, añade bordes y descarga por lotes. Sin subir archivos ni registrarte.',
      headline: 'Redimensiona y comprime imágenes gratis', intro: 'Recorta, convierte y añade bordes desde tu navegador. Gratis, sin subir archivos ni crear una cuenta.', label: 'Todas las herramientas', guideTitle: 'Cómo cambiar el tamaño de una imagen',
      steps: ['Selecciona una o varias imágenes JPG, PNG o WebP de tu dispositivo.', 'Recorta con una proporción predefinida o personalizada. Ajusta el tamaño en píxeles o porcentaje y elige formato y calidad.', 'Compara el tamaño estimado y las dimensiones, procesa las imágenes y descarga un archivo o un ZIP.'],
      tip: 'Un recorte de 2400 × 1600 al 50% produce 1200 × 800 antes de añadir bordes. Para conservar toda la imagen, extiende primero el recorte hasta los extremos. Ampliar no recupera detalles perdidos.',
      faqs: [['¿Qué formato debo elegir?', 'JPEG es útil para fotos sin transparencia. PNG ofrece transparencia y compresión sin pérdida. WebP permite transparencia y calidad ajustable; comprueba que el destino lo admita.'], ['¿Se suben mis fotos?', 'No. El navegador procesa las imágenes y no envía los archivos ni los resultados a PicSizeKit. Guarda tus descargas antes de cerrar la página.'], ['¿Puedo conservar los metadatos?', 'Los datos EXIF se eliminan de forma predeterminada. Puedes conservarlos al procesar JPEG a JPEG; no se garantiza su conservación completa al cambiar de formato.']],
    },
    'compress-image': {
      title: 'Comprimir imágenes JPG y WebP gratis | PicSizeKit', description: 'Comprime imágenes JPG y WebP en tu navegador. Ajusta la calidad, compara tamaños y dimensiones y descarga archivos sueltos o un ZIP. Sin subir imágenes.',
      headline: 'Comprime imágenes gratis', intro: 'Ajusta la calidad y compara el tamaño antes de descargar. Las imágenes permanecen en tu dispositivo.', label: 'Comprimir imágenes', guideTitle: 'Cómo reducir el tamaño de un archivo de imagen',
      steps: ['Selecciona tus imágenes. La configuración inicial es WebP, calidad del 82% y escala del 100%.', 'Mueve el control de calidad y compara el original con la salida estimada. Reduce la escala si también quieres menos píxeles.', 'Procesa y descarga el resultado. Varias imágenes se agrupan en un ZIP.'],
      tip: 'Una foto que ya está muy comprimida puede ocupar más al volver a codificarla. Comprueba la estimación real. El valor de calidad no es un porcentaje garantizado de reducción del archivo.',
      faqs: [['¿Puedo comprimir a exactamente 100 KB?', 'No hay un modo automático de tamaño objetivo. Ajusta la calidad y las dimensiones mientras observas la estimación hasta cumplir tu límite.'], ['¿La compresión cambia las dimensiones?', 'La escala inicial del 100% conserva las dimensiones del recorte. Cambiar solo la calidad no reduce los píxeles. Recortar, redimensionar o añadir bordes sí cambia las dimensiones.'], ['¿Por qué PNG no tiene control de calidad?', 'PNG usa compresión sin pérdida. Reduce las dimensiones o elige WebP o JPEG para intentar reducir más el archivo. JPEG no conserva la transparencia.']],
    },
    'webp-to-jpg': {
      title: 'Convertir WebP a JPG gratis | PicSizeKit', description: 'Convierte WebP a JPG localmente en el navegador. Ajusta la calidad JPEG, compara el tamaño de salida y descarga por lotes. Gratis y sin registro.',
      headline: 'Convierte WebP a JPG', intro: 'Convierte fotos WebP al formato JPEG para compartirlas. Procesa una imagen o un lote en tu dispositivo.', label: 'WebP a JPG', guideTitle: 'Cómo convertir WebP a JPG',
      steps: ['Selecciona los archivos WebP. El formato JPEG y la escala del 100% ya están seleccionados.', 'Elige la calidad JPEG y revisa el tamaño estimado. Mantén el recorte original para conservar toda la imagen.', 'Procesa y descarga el JPG o un ZIP con todas las imágenes convertidas.'],
      tip: 'JPG y JPEG son el mismo formato. JPEG no admite transparencia: las zonas transparentes se rellenan de blanco. La conversión puede aumentar el archivo y no recupera detalles perdidos.',
      faqs: [['¿Se conserva el fondo transparente?', 'No en JPEG: se rellena de blanco. Elige PNG o WebP si necesitas transparencia.'], ['¿Se conservan las animaciones WebP?', 'No. El editor produce imágenes estáticas y no mantiene la animación del archivo original.'], ['¿Puedo convertir varios archivos a la vez?', 'Sí. Selecciona varios, configura la salida, procesa y descarga el ZIP. Los lotes grandes dependen de la memoria del dispositivo.']],
    },
    'add-border-to-photo': {
      title: 'Añadir bordes a fotos gratis | PicSizeKit', description: 'Añade bordes rectos a tus fotos: en todos los lados o solo arriba y abajo. Elige entre 8 colores, RGB personalizado y anchura en píxeles. Sin subir archivos.',
      headline: 'Añade bordes a tus fotos', intro: 'Ajusta la anchura en píxeles y elige colores discretos o RGB personalizado. Previsualiza antes de descargar.', label: 'Añadir bordes', guideTitle: 'Cómo añadir un borde a una foto',
      steps: ['Selecciona una foto. Se activa un borde marfil de 32 píxeles en los cuatro lados.', 'Elige todos los lados o solo arriba y abajo. Ajusta la anchura con el deslizador o un número y selecciona el color.', 'Haz doble clic o toca dos veces el recorte para abrir la vista de cine; después procesa y descarga.'],
      tip: 'Los bordes se añaden fuera de la imagen. Una foto de 1200 × 800 con 32 píxeles en cada lado pasa a 1264 × 864. Solo arriba y abajo produce 1200 × 864. Las esquinas son rectas.',
      faqs: [['¿El borde tapa la foto?', 'No. Amplía el lienzo alrededor de la imagen procesada y no cubre el recorte. Las dimensiones finales incluyen el borde.'], ['¿Puedo usar blanco o negro?', 'Sí. Introduce RGB 255, 255, 255 para blanco o 0, 0, 0 para negro. También hay ocho colores predefinidos.'], ['¿Puedo crear una imagen de estilo cinematográfico?', 'Elige una proporción como 1.85:1, 2.35:1 o 2.39:1 y añade bordes arriba y abajo. La proporción de recorte se aplica al contenido; los bordes cambian la proporción del lienzo final.']],
    },
  },
  'zh-Hant': {
    home: {
      title: '免費線上圖片縮放、裁切與壓縮工具 | PicSizeKit', description: '免費調整圖片尺寸、裁切和壓縮，支援 JPG、PNG、WebP 格式轉換、相框及批次下載。圖片僅在本機瀏覽器處理，無須上傳或註冊。',
      headline: '免費線上圖片縮放與壓縮工具', intro: '在瀏覽器中縮放、裁切、轉換圖片及加入相框。免費使用，無須上傳或註冊。', label: '全部圖片工具', guideTitle: '如何調整圖片尺寸',
      steps: ['從裝置選取一張或多張 JPG、PNG 或 WebP 圖片。', '依預設或自訂比例裁切，以像素或百分比設定輸出尺寸，再選擇格式和壓縮品質。', '比較預估容量與像素尺寸，處理後下載單張圖片或批次 ZIP。'],
      tip: '裁切範圍為 2400 × 1600 時，選擇百分比並輸入 50，未加邊框的輸出為 1200 × 800。若要保留完整畫面，請先將裁切框擴展至圖片邊緣。放大圖片不會還原遺失的細節。',
      faqs: [['JPG、PNG 和 WebP 該怎麼選？', '照片不需要透明背景時可選 JPEG；PNG 支援透明背景及無損壓縮；WebP 支援透明背景與可調品質，請先確認接收平台支援。'], ['照片會被上傳嗎？', '不會。圖片在瀏覽器內處理，所選檔案及輸出圖片不會上傳到 PicSizeKit。關閉頁面前請保存下載結果。'], ['可以保留中繼資料嗎？', '預設移除 EXIF 隱私資訊。JPEG 轉 JPEG 時可關閉此選項以保留資料，跨格式轉換不保證完整保留。']],
    },
    'compress-image': {
      title: '免費線上圖片壓縮 — JPG 與 WebP | PicSizeKit', description: '在本機瀏覽器壓縮 JPG、WebP 圖片，調整品質並即時比較容量與像素，支援單張及批次 ZIP 下載，無須上傳。',
      headline: '免費線上壓縮圖片', intro: '調整壓縮品質，下載前比較圖片容量。圖片始終留在你的裝置。', label: '圖片壓縮', guideTitle: '如何減少圖片檔案容量',
      steps: ['選取圖片。預設使用 WebP 輸出、82% 品質與 100% 縮放。', '移動品質滑桿，比較原圖與預估輸出；如需減少像素，可降低縮放百分比。', '處理完成後下載，多張圖片會打包為 ZIP。'],
      tip: '已高度壓縮的照片再次編碼後不一定更小，請以預估容量為準。品質數值是編碼參數，不代表容量一定按相同比例縮小。',
      faqs: [['可以自動壓縮到 100 KB 嗎？', '目前沒有自動指定目標容量的模式。請調整品質和尺寸，觀察預估容量直到符合限制。'], ['壓縮會改變像素尺寸嗎？', '預設 100% 縮放保留裁切範圍的像素。僅降低品質不會減少像素；裁切、縮放或加邊框則會改變尺寸。'], ['為什麼 PNG 沒有品質滑桿？', 'PNG 使用無損壓縮。如需進一步減少容量，可降低尺寸或改選 WebP、JPEG；JPEG 不支援透明背景。']],
    },
    'webp-to-jpg': {
      title: '免費線上 WebP 轉 JPG — 本機批次轉換 | PicSizeKit', description: '在瀏覽器內將 WebP 轉換為 JPG，支援 JPEG 品質調整、容量比較及批次下載。免費使用，無須上傳或註冊。',
      headline: '線上將 WebP 轉換為 JPG', intro: '將 WebP 照片轉為方便分享的 JPEG，支援單張或批次本機處理。', label: 'WebP 轉 JPG', guideTitle: '如何將 WebP 轉換為 JPG',
      steps: ['選取 WebP 檔案，頁面已預選 JPEG 輸出與 100% 縮放。', '調整 JPEG 品質並查看預估容量，保留原始裁切範圍即可保留完整畫面。', '處理後下載 JPG，或包含多張轉換結果的 ZIP。'],
      tip: 'JPG 和 JPEG 是同一種格式。JPEG 無法保留透明度，透明區域會填白。轉換可能增加容量，也無法還原原圖已遺失的細節。',
      faqs: [['透明背景會保留嗎？', '輸出 JPEG 時會填白；需要透明度時請選 PNG 或 WebP。'], ['可以保留動態 WebP 的動畫嗎？', '不行，編輯器輸出靜態圖片，不會保留動畫。'], ['能一次轉換多個檔案嗎？', '可以。選取多個檔案並設定輸出參數，處理後下載 ZIP。大型圖片與批次的處理能力受裝置記憶體限制。']],
    },
    'add-border-to-photo': {
      title: '免費線上照片加邊框 — 自訂顏色與寬度 | PicSizeKit', description: '為照片加入直角邊框，支援四周或僅上下、8 種沉穩配色、自訂 RGB 與像素寬度。本機處理，無須上傳。',
      headline: '線上為照片加入邊框', intro: '以像素設定邊框寬度，選擇沉穩配色或自訂 RGB，預覽後下載。', label: '照片加邊框', guideTitle: '如何為照片加入邊框',
      steps: ['選取照片，預設開啟四周 32 像素暖白邊框。', '選擇四周全包或僅上下，以滑桿或數字調整寬度，再選擇預設顏色或自訂 RGB。', '按兩下或連續輕點兩次裁切範圍進入劇院預覽，確認後處理並下載。'],
      tip: '邊框加在圖片外側。1200 × 800 的圖片加上四周 32 像素邊框後為 1264 × 864；僅上下則為 1200 × 864。邊框使用直角。',
      faqs: [['邊框會遮住照片嗎？', '不會。邊框擴展處理後圖片的畫布，不遮住裁切內容。最終像素尺寸包含邊框。'], ['可以加入純白或純黑邊框嗎？', '可以。RGB 輸入 255、255、255 為白色，0、0、0 為黑色，也有 8 種預設配色。'], ['如何製作電影畫幅？', '選擇 1.85:1、2.35:1 或 2.39:1 等裁切比例，再加入上下邊框。裁切比例針對畫面內容，加上邊框後最終畫布比例會改變。']],
    },
  },
};
