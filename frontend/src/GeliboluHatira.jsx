import React from "react";
import RusIzleriSlider from "./RusIzleriSlider";
import TurkeyFlag from "./images/TurkeyFlag.svg";
import RussiaFlag from "./images/RussiaFlag.svg";

const GeliboluHatira = () => {
  return (
    <div className="container my-5 py-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">
              <i className="fa-solid fa-house me-1"></i> Ana Sayfa
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
           Gelibolu’da Rusların Anısına Yapılan Hatıra
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-school text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
Gelibolu’da Rusların Anısına Yapılan Hatıra        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Rusların Anısına Yapılan Hatıra Hakkında
          </h4>
             <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            <img src={TurkeyFlag} alt="Türkiye Bayrağı" style={{ width: "5%" }} />
          </h3>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-6">Gelibolu’da Rusların Anısına Yapılan Hatıra Anıtının Korunması ve Restorasyonu Üzerine Faaliyet Raporu:</h3>


          <p className="card-text">

Rusya Federasyonu Hükûmeti'nin 11 Kasım 2010 tarihli ve №1948-r sayılı kararı gereği, Rusya Federasyonu için tarihî ve anımsal öneme sahip yurtdışındaki mezarlık ve anıt yerlerinin listesine Gelibolu'daki Rus Hatıra Anıtı da eklenmiştir. Bu bağlamda söz konusu anıtın korunması ve düzenli bakımı, Rusya Federasyonu Rossotrudnichestvo Federal Ajansı’nın Türkiye Cumhuriyeti Temsilciliği tarafından gerçekleştirilmektedir.

          </p>


          <p className="card-text">
1920-1921 yılları arasında General A.P. Kutepov komutasındaki Rus Kolordusu’nun Çanakkale’nin Gelibolu (eski adıyla Gallipoli) ilçesinde kaldıkları dönemde hayatlarını kaybeden Rus askerlerin anısına yapılmış olan anıt, ilk kez 1949 yılında gerçekleşen deprem sonucu yıkılmıştır. Ardından Rusya Federasyonu Dışişleri Bakanlığı'na bağlı kurumlar ve Andrey Pervozvannıy Rusya Ulusal Gurur Vakfı tarafından restore edilerek, 2008 yılında yeniden açılmıştır.


          </p>
<p className="card-text">

Anıtın 2008 yılındaki yeniden açılışından itibaren, Rossotrudnichestvo Türkiye Temsilciliği tarafından peyzaj çalışmaları, yeşillendirme, sulama, aydınlatma ve bölgenin düzenli temizlenmesi gibi düzenli bakım faaliyetleri yürütülmektedir. Ancak, bölgenin şiddetli yağışlar, kuvvetli rüzgarlar ve ani sıcaklık değişimleri gibi olumsuz hava koşulları sebebiyle 2015 yılı sonunda anıt ciddi hasarlar görmüş ve durumu kötüleşmiştir. Özellikle anıtın dış kaplaması zarar görmüş, taş duvarlarda kırılmalar ve dökülmeler oluşmuş, isim plakalarındaki yazılar silinmiş, metal aksamda paslanmalar meydana gelmiş ve mermer plakaların dekoratif kısımları zarar görerek kenarlarda çatlak ve kırıklar oluşmuştur.

          </p>
          <p className="card-text">
Bu olumsuzluklar göz önünde bulundurularak, Mayıs 2016'da anıtın açılışının 95. yıldönümü dolayısıyla Rossotrudnichestvo Türkiye Temsilciliği tarafından kapsamlı bir onarım ve restorasyon çalışması gerçekleştirilmiştir.

          </p>
          <p className="card-text">
Ayrıca Mart-Mayıs 2018 tarihlerinde Temsilcilik, olumsuz hava koşullarından dolayı tamamen tahrip olmuş olan anıt çevresindeki çim alanların yenilenmesi için peyzaj ve yeşillendirme çalışmalarını tamamlamıştır. Bu süreçte, partner kuruluşumuz olan Tunca Hukuk'un sponsorluğunda anıtın çevre çiti yeniden onarılmış ve boyanmıştır.

          </p>
          <p className="card-text">

Anıtın bakımı ve korunması faaliyetlerinin yanı sıra, Gelibolu yerel yönetimi ile yakın bir iş birliği yürütülmekte, belediye başkanı ile düzenli toplantılar yapılmakta ve anıtın ilçenin turistik rotalarına dahil edilmesi konusunda anlaşmalar sağlanmaktadır. Bu sayede anıtın tarihî ve kültürel öneminin daha geniş kitlelere duyurulması amaçlanmaktadır.
          </p>
             <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
                         <img src={RussiaFlag} alt="Rusya Bayrağı" style={{ width: "5%" }} className="border" />
                       </h3>
                       <p className="card-text">
                        Справка о деятельности представительства Россотрудничества в Турецкой Республике по поддержанию в надлежащем состоянии Мемориала
в память россиян в г. Гелиболу 

Согласно Распоряжению Правительства Российской Федерации
от 11 ноября 2010 года № 1948-р в Перечень находящихся за рубежом мест погребения, имеющих для Российской Федерации историко-мемориальное значение, включен Мемориал в память россиян в г. Гелиболу.
Постановлением Правительства Российской Федерации
от 31 мая 2010 года № 379 «Об утверждении Правил организации работы
по поддержанию и сохранению находящихся за рубежом мест погребения, имеющих для Российской Федерации историко-мемориальное значение» работы по поддержанию Мемориала в надлежащем состоянии и его сохранению закреплены за представительством Россотрудничества
в Турецкой Республике.
В 2008 году в г. Гелиболу (бывш. Галлиполи) провинции Чанаккале
был открыт восстановленный мемориальный комплекс в память россиян, умерших во время пребывания там в 1920-1921 гг. корпуса генерала А.П.Кутепова. (Справочно: в 1949 г. памятник был разрушен землетрясением; в 2008 г. силами учреждений МИД России, Фонда Андрея Первозванного
 и Центра национальной славы удалось восстановить Мемориал.)
С 2008 г. Представительством осуществляется текущая работа
по поддержанию Мемориала в надлежащем виде (озеленение, полив, освещение, уборка территории). Однако в связи с неблагоприятными климатическими условиями данного региона (ливневые дожди, сырой климат, сильные ветра, резкие температурные перепады в условиях его нахождения
под открытым небом) к концу 2015 г. состояние объекта оценивалось как удручающее (была нарушена облицовка основного памятника; раскололись
и частично отпали каменные блоки в кладке; сошла краска с выбитых на плитах имён; пошла ржавчина на металлических частях ограды и фонарных столбах; откололись элементы декоративной отделки мраморных плит с именами захороненных; по краям были заметны сколы и трещины в направлении опор, что могло привести к их обрушению).
В мае 2016 г. Представительство Россотрудничества провело ремонтно-восстановительные работы на Мемориале, которые были приурочены 
к 95-летию его создания. 
В марте-мае 2018 г. Представительство осуществило ландшафтные 
и озеленительные работы, направленные на воссоздание газонного покрытия Мемориала, полностью уничтоженного в результате неблагоприятных погодных условий за период с 2008 г. При спонсорской поддержке наших партнеров – турецкой юридической компании «Тунджа хукук» были осуществлены ремонт и покраска ограды Мемориала. 
Помимо организованных ремонтно-реставрационных работ 
на Мемориале, ведется регулярная работа с руководством г. Гелиболу. Проведено несколько встреч с мэром города, достигнуты договоренности 
о включении Мемориала в туристические маршруты данного региона.
Вопрос о возможности включения памятника в перечень охраняемых государством культурных объектов поставлен перед МИД Турции.
Стоит упомянуть, что Представительством 2-3 раза в течение года
на Мемориале проводятся «субботники» силами сотрудников РЦНК 
и представителей партнерских общественных организаций.
6 мая 2018 года в г. Гелиболу состоялись памятные мероприятия, посвящённые 10-летию со дня открытия Мемориала в память россиян, воссозданного в 2008 году силами Фонда Андрея Первозванного.
В мероприятии, организованном Фондом Андрея Первозванного при активном участии представительства Россотрудничества, приняли участие Генконсульство России в Стамбуле, делегация Фонда, представители Союза потомков галлиполийцев, администрации провинции Чанаккале, Мэрии г. Гелиболу, общественных организаций района 
В продолжение галлиполийской тематики 7 мая 2018 года 
в Галатасарайском университете в г. Стамбуле состоялся научно-общественный круглый стол «Россия и Турция в диалоге культур», в подготовке и проведении которого активное участие приняло представительство Россотрудничества 
29 ноября 2018 года в гг. Чанаккале и Гелиболу состоялись мероприятия, посвящённые годовщине исхода частей Белой армии из России и прибытия 
их в г. Галлиполи (24 ноября 1920 г.), а также  подготовке к 100-летию данного исторического события. Акция была приурочена к Дню неизвестного солдата, который с 2014 года ежегодно отмечается в России и за её пределами 
3 декабря в память о российских воинах. Решение об установлении этой памятной даты было принято Государственной Думой в октябре 2014 года, 
а соответствующий указ был подписан президентом Российской Федерации
 в ноябре того же года
                       </p>
        </div>
      </div>
      <RusIzleriSlider />

      {/* Map Section */}
      <div className="card shadow-sm border-0 mt-4">
        <div className="card-body p-4">
          <h4 className="card-title mb-3 fw-bold">
            <i className="fa-solid fa-map-location-dot me-2 text-primary"></i>
            Konum
          </h4>

          <div className="d-flex justify-content-center align-items-center">
            <iframe
              src="https://yandex.com/map-widget/v1/-/CHfKe2YW"
              className="w-100 mt-4 rounded-4"
              style={{ height: "75vh" }}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeliboluHatira;
