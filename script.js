/* =====================================================
   ZENGİNCEP
   HESAPLAMA SİSTEMİ
   ===================================================== */


/* =====================================================
   GENEL YARDIMCI FONKSİYONLAR
   ===================================================== */

function getNumber(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return 0;
    }

    const value =
        element.value
            .replace(",", ".")
            .trim();

    const number =
        Number(value);

    return Number.isFinite(number)
        ? number
        : 0;
}


function formatNumber(number) {

    return new Intl.NumberFormat(
        "tr-TR",
        {
            maximumFractionDigits: 2
        }
    ).format(number);

}


function formatTL(number) {

    return new Intl.NumberFormat(
        "tr-TR",
        {
            style: "currency",
            currency: "TRY",
            maximumFractionDigits: 2
        }
    ).format(number);

}


function showResult(
    result,
    detail = ""
) {

    const resultBox =
        document.getElementById(
            "resultBox"
        );

    const resultValue =
        document.getElementById(
            "resultValue"
        );

    const resultDetail =
        document.getElementById(
            "resultDetail"
        );


    if (!resultBox ||
        !resultValue) {

        return;

    }


    resultValue.textContent =
        result;


    if (resultDetail) {

        resultDetail.textContent =
            detail;

    }


    resultBox.classList.remove(
        "hidden"
    );

}


/* =====================================================
   HESAPLAYICI AÇ
   ===================================================== */

function openCalculator(
    type
) {

    const area =
        document.getElementById(
            "calculatorArea"
        );

    const content =
        document.getElementById(
            "calculatorContent"
        );


    if (!area || !content) {
        return;
    }


    let html = "";


    /* =================================================
       YÜZDE
       ================================================= */

    if (type === "percentage") {

        html = `

            <h2>
                % Yüzde Hesaplama
            </h2>

            <p class="calculator-description">
                Bir sayının belirlediğin yüzdesini hesapla.
            </p>


            <div class="calculator-form">

                <div class="form-group">

                    <label>
                        Sayı
                    </label>

                    <input
                        type="number"
                        id="percentageNumber"
                        placeholder="Örneğin 1000"
                        inputmode="decimal"
                    >

                </div>


                <div class="form-group">

                    <label>
                        Yüzde
                    </label>

                    <input
                        type="number"
                        id="percentageRate"
                        placeholder="Örneğin 20"
                        inputmode="decimal"
                    >

                </div>


                <button
                    class="calculate-button"
                    type="button"
                    onclick="calculatePercentage()"
                >
                    Hesapla
                </button>


                ${resultHTML()}

                ${closeHTML()}

            </div>

        `;

    }


    /* =================================================
       İNDİRİM
       ================================================= */

    else if (type === "discount") {

        html = `

            <h2>
                🏷️ İndirim Hesaplama
            </h2>

            <p class="calculator-description">
                İndirimli ürün fiyatını ve indirim tutarını hesapla.
            </p>


            <div class="calculator-form">

                <div class="form-group">

                    <label>
                        Ürün fiyatı (TL)
                    </label>

                    <input
                        type="number"
                        id="discountPrice"
                        placeholder="Örneğin 5000"
                        inputmode="decimal"
                    >

                </div>


                <div class="form-group">

                    <label>
                        İndirim oranı (%)
                    </label>

                    <input
                        type="number"
                        id="discountRate"
                        placeholder="Örneğin 15"
                        inputmode="decimal"
                    >

                </div>


                <button
                    class="calculate-button"
                    type="button"
                    onclick="calculateDiscount()"
                >
                    Hesapla
                </button>


                ${resultHTML()}

                ${closeHTML()}

            </div>

        `;

    }


    /* =================================================
       KDV
       ================================================= */

    else if (type === "vat") {

        html = `

            <h2>
                💰 KDV Hesaplama
            </h2>

            <p class="calculator-description">
                KDV dahil veya hariç fiyatı hesapla.
            </p>


            <div class="calculator-form">

                <div class="form-group">

                    <label>
                        Fiyat (TL)
                    </label>

                    <input
                        type="number"
                        id="vatPrice"
                        placeholder="Örneğin 10000"
                        inputmode="decimal"
                    >

                </div>


                <div class="form-group">

                    <label>
                        KDV oranı (%)
                    </label>

                    <select id="vatRate">

                        <option value="20">
                            %20
                        </option>

                        <option value="10">
                            %10
                        </option>

                        <option value="1">
                            %1
                        </option>

                    </select>

                </div>


                <div class="form-group">

                    <label>
                        Hesaplama türü
                    </label>

                    <select id="vatType">

                        <option value="add">
                            KDV hariç fiyata KDV ekle
                        </option>

                        <option value="remove">
                            KDV dahil fiyattan KDV çıkar
                        </option>

                    </select>

                </div>


                <button
                    class="calculate-button"
                    type="button"
                    onclick="calculateVAT()"
                >
                    Hesapla
                </button>


                ${resultHTML()}

                ${closeHTML()}

            </div>

        `;

    }


    /* =================================================
       TAKSİT
       ================================================= */

    else if (type === "installment") {

        html = `

            <h2>
                💳 Taksit Hesaplama
            </h2>

            <p class="calculator-description">
                Toplam tutarı taksitlere böl.
            </p>


            <div class="calculator-form">

                <div class="form-group">

                    <label>
                        Toplam tutar (TL)
                    </label>

                    <input
                        type="number"
                        id="installmentPrice"
                        placeholder="Örneğin 12000"
                        inputmode="decimal"
                    >

                </div>


                <div class="form-group">

                    <label>
                        Taksit sayısı
                    </label>

                    <select id="installmentCount">

                        <option value="2">
                            2 Taksit
                        </option>

                        <option value="3">
                            3 Taksit
                        </option>

                        <option value="6">
                            6 Taksit
                        </option>

                        <option value="9">
                            9 Taksit
                        </option>

                        <option value="12">
                            12 Taksit
                        </option>

                        <option value="18">
                            18 Taksit
                        </option>

                        <option value="24">
                            24 Taksit
                        </option>

                    </select>

                </div>


                <button
                    class="calculate-button"
                    type="button"
                    onclick="calculateInstallment()"
                >
                    Hesapla
                </button>


                ${resultHTML()}

                ${closeHTML()}

            </div>

        `;

    }


    /* =================================================
       YAKIT
       ================================================= */

    else if (type === "fuel") {

        html = `

            <h2>
                ⛽ Yakıt Maliyeti
            </h2>

            <p class="calculator-description">
                Bir yolculuğun tahmini yakıt maliyetini hesapla.
            </p>


            <div class="calculator-form">

                <div class="form-group">

                    <label>
                        Mesafe (km)
                    </label>

                    <input
                        type="number"
                        id="fuelDistance"
                        placeholder="Örneğin 350"
                        inputmode="decimal"
                    >

                </div>


                <div class="form-group">

                    <label>
                        100 km'de tüketim (L)
                    </label>

                    <input
                        type="number"
                        id="fuelConsumption"
                        placeholder="Örneğin 7.5"
                        inputmode="decimal"
                        step="0.1"
                    >

                </div>


                <div class="form-group">

                    <label>
                        Yakıt litre fiyatı (TL)
                    </label>

                    <input
                        type="number"
                        id="fuelPrice"
                        placeholder="Örneğin 55"
                        inputmode="decimal"
                        step="0.01"
                    >

                </div>


                <button
                    class="calculate-button"
                    type="button"
                    onclick="calculateFuel()"
                >
                    Hesapla
                </button>


                ${resultHTML()}

                ${closeHTML()}

            </div>

        `;

    }


    /* =================================================
       YOL MASRAFI
       ================================================= */

    else if (type === "travel") {

        html = `

            <h2>
                🚗 Yol Masrafı
            </h2>

            <p class="calculator-description">
                Yolculuğun yakıt ve ek masraflarını hesapla.
            </p>


            <div class="calculator-form">

                <div class="form-group">

                    <label>
                        Mesafe (km)
                    </label>

                    <input
                        type="number"
                        id="travelDistance"
                        placeholder="Örneğin 500"
                        inputmode="decimal"
                    >

                </div>


                <div class="form-group">

                    <label>
                        100 km'de tüketim (L)
                    </label>

                    <input
                        type="number"
                        id="travelConsumption"
                        placeholder="Örneğin 7"
                        inputmode="decimal"
                        step="0.1"
                    >

                </div>


                <div class="form-group">

                    <label>
                        Yakıt litre fiyatı (TL)
                    </label>

                    <input
                        type="number"
                        id="travelFuelPrice"
                        placeholder="Örneğin 55"
                        inputmode="decimal"
                        step="0.01"
                    >

                </div>


                <div class="form-group">

                    <label>
                        Ek yol masrafı (TL)
                    </label>

                    <input
                        type="number"
                        id="travelExtra"
                        placeholder="Otoyol, köprü vb."
                        value="0"
                        inputmode="decimal"
                    >

                </div>


                <button
                    class="calculate-button"
                    type="button"
                    onclick="calculateTravel()"
                >
                    Hesapla
                </button>


                ${resultHTML()}

                ${closeHTML()}

            </div>

        `;

    }


    /* =================================================
       KİRA
       ================================================= */

    else if (type === "rent") {

        html = `

            <h2>
                🏠 Kira Artışı
            </h2>

            <p class="calculator-description">
                Kira artış oranına göre yeni kira tutarını hesapla.
            </p>


            <div class="calculator-form">

                <div class="form-group">

                    <label>
                        Mevcut kira (TL)
                    </label>

                    <input
                        type="number"
                        id="rentPrice"
                        placeholder="Örneğin 15000"
                        inputmode="decimal"
                    >

                </div>


                <div class="form-group">

                    <label>
                        Artış oranı (%)
                    </label>

                    <input
                        type="number"
                        id="rentRate"
                        placeholder="Örneğin 25"
                        inputmode="decimal"
                    >

                </div>


                <button
                    class="calculate-button"
                    type="button"
                    onclick="calculateRent()"
                >
                    Hesapla
                </button>


                ${resultHTML()}

                ${closeHTML()}

            </div>

        `;

    }


    /* =================================================
       ELEKTRİK
       ================================================= */

    else if (type === "electricity") {

        html = `

            <h2>
                ⚡ Elektrik Hesaplama
            </h2>

            <p class="calculator-description">
                Tüketim miktarına göre yaklaşık elektrik maliyetini hesapla.
            </p>


            <div class="calculator-form">

                <div class="form-group">

                    <label>
                        Aylık tüketim (kWh)
                    </label>

                    <input
                        type="number"
                        id="electricityConsumption"
                        placeholder="Örneğin 250"
                        inputmode="decimal"
                    >

                </div>


                <div class="form-group">

                    <label>
                        kWh birim fiyatı (TL)
                    </label>

                    <input
                        type="number"
                        id="electricityRate"
                        placeholder="Birim fiyatı gir"
                        inputmode="decimal"
                        step="0.001"
                    >

                </div>


                <button
                    class="calculate-button"
                    type="button"
                    onclick="calculateElectricity()"
                >
                    Hesapla
                </button>


                ${resultHTML()}

                ${closeHTML()}

            </div>

        `;

    }


    content.innerHTML =
        html;


    area.classList.remove(
        "hidden"
    );


    area.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   SONUÇ HTML
   ===================================================== */

function resultHTML() {

    return `

        <div
            id="resultBox"
            class="result-box hidden"
        >

            <div class="result-label">
                Sonuç
            </div>

            <div
                id="resultValue"
                class="result-value"
            >
                -
            </div>

            <div
                id="resultDetail"
                class="result-detail"
            ></div>

        </div>

    `;

}


/* =====================================================
   KAPAT HTML
   ===================================================== */

function closeHTML() {

    return `

        <button
            class="close-calculator"
            type="button"
            onclick="closeCalculator()"
        >
            Hesaplayıcıyı Kapat
        </button>

    `;

}


/* =====================================================
   HESAPLAYICI KAPAT
   ===================================================== */

function closeCalculator() {

    const area =
        document.getElementById(
            "calculatorArea"
        );


    if (!area) {
        return;
    }


    area.classList.add(
        "hidden"
    );


    window.location.hash =
        "calculators";

}


/* =====================================================
   YÜZDE HESAPLA
   ===================================================== */

function calculatePercentage() {

    const number =
        getNumber(
            "percentageNumber"
        );

    const rate =
        getNumber(
            "percentageRate"
        );


    if (
        number === 0 &&
        rate === 0
    ) {

        showResult(
            "Lütfen değerleri gir.",
            ""
        );

        return;

    }


    const result =
        number *
        rate /
        100;


    showResult(
        formatNumber(result),
        `${formatNumber(number)} sayısının %${formatNumber(rate)}'si`
    );

}


/* =====================================================
   İNDİRİM HESAPLA
   ===================================================== */

function calculateDiscount() {

    const price =
        getNumber(
            "discountPrice"
        );

    const rate =
        getNumber(
            "discountRate"
        );


    if (
        price <= 0 ||
        rate < 0
    ) {

        showResult(
            "Geçerli değer gir.",
            ""
        );

        return;

    }


    const discount =
        price *
        rate /
        100;


        const finalPrice =
        price -
        discount;


    showResult(
        formatTL(finalPrice),
        `İndirim tutarı: ${formatTL(discount)}`
    );

}


/* =====================================================
   KDV HESAPLA
   ===================================================== */

function calculateVAT() {

    const price =
        getNumber(
            "vatPrice"
        );

    const rate =
        getNumber(
            "vatRate"
        );

    const type =
        document.getElementById(
            "vatType"
        );


    if (
        price <= 0 ||
        rate < 0 ||
        !type
    ) {

        showResult(
            "Geçerli değer gir.",
            ""
        );

        return;

    }


    let result;

    let detail;


    if (
        type.value ===
        "add"
    ) {

        const vat =
            price *
            rate /
            100;


        result =
            price +
            vat;


        detail =
            `KDV tutarı: ${formatTL(vat)}`;

    }

    else {

        result =
            price /
            (1 + rate / 100);


        const vat =
            price -
            result;


        detail =
            `İçindeki KDV: ${formatTL(vat)}`;

    }


    showResult(
        formatTL(result),
        detail
    );

}


/* =====================================================
   TAKSİT HESAPLA
   ===================================================== */

function calculateInstallment() {

    const price =
        getNumber(
            "installmentPrice"
        );

    const countElement =
        document.getElementById(
            "installmentCount"
        );


    if (
        price <= 0 ||
        !countElement
    ) {

        showResult(
            "Geçerli değer gir.",
            ""
        );

        return;

    }


    const count =
        Number(
            countElement.value
        );


    const installment =
        price /
        count;


    showResult(
        formatTL(installment),
        `${count} taksit toplamı: ${formatTL(price)}`
    );

}


/* =====================================================
   YAKIT HESAPLA
   ===================================================== */

function calculateFuel() {

    const distance =
        getNumber(
            "fuelDistance"
        );

    const consumption =
        getNumber(
            "fuelConsumption"
        );

    const fuelPrice =
        getNumber(
            "fuelPrice"
        );


    if (
        distance <= 0 ||
        consumption <= 0 ||
        fuelPrice <= 0
    ) {

        showResult(
            "Lütfen tüm değerleri gir.",
            ""
        );

        return;

    }


    const liters =
        distance *
        consumption /
        100;


    const cost =
        liters *
        fuelPrice;


    showResult(
        formatTL(cost),
        `Tahmini tüketim: ${formatNumber(liters)} litre`
    );

}


/* =====================================================
   YOL MASRAFI HESAPLA
   ===================================================== */

function calculateTravel() {

    const distance =
        getNumber(
            "travelDistance"
        );

    const consumption =
        getNumber(
            "travelConsumption"
        );

    const fuelPrice =
        getNumber(
            "travelFuelPrice"
        );

    const extra =
        getNumber(
            "travelExtra"
        );


    if (
        distance <= 0 ||
        consumption <= 0 ||
        fuelPrice <= 0 ||
        extra < 0
    ) {

        showResult(
            "Lütfen geçerli değerleri gir.",
            ""
        );

        return;

    }


    const liters =
        distance *
        consumption /
        100;


    const fuelCost =
        liters *
        fuelPrice;


    const total =
        fuelCost +
        extra;


    showResult(
        formatTL(total),
        `Yakıt: ${formatTL(fuelCost)} • Ek masraf: ${formatTL(extra)}`
    );

}


/* =====================================================
   KİRA ARTIŞI HESAPLA
   ===================================================== */

function calculateRent() {

    const price =
        getNumber(
            "rentPrice"
        );

    const rate =
        getNumber(
            "rentRate"
        );


    if (
        price <= 0 ||
        rate < 0
    ) {

        showResult(
            "Geçerli değer gir.",
            ""
        );

        return;

    }


    const increase =
        price *
        rate /
        100;


    const newRent =
        price +
        increase;


    showResult(
        formatTL(newRent),
        `Artış tutarı: ${formatTL(increase)}`
    );

}


/* =====================================================
   ELEKTRİK HESAPLA
   ===================================================== */

function calculateElectricity() {

    const consumption =
        getNumber(
            "electricityConsumption"
        );

    const rate =
        getNumber(
            "electricityRate"
        );


    if (
        consumption <= 0 ||
        rate <= 0
    ) {

        showResult(
            "Lütfen geçerli değerleri gir.",
            ""
        );

        return;

    }


    const total =
        consumption *
        rate;


    showResult(
        formatTL(total),
        `${formatNumber(consumption)} kWh tüketim`
    );

}


/* =====================================================
   SAYFA AÇILDIĞINDA
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const calculatorArea =
            document.getElementById(
                "calculatorArea"
            );


        if (calculatorArea) {

            calculatorArea.classList.add(
                "hidden"
            );

        }

    }
);


/* =====================================================
   GLOBAL FONKSİYONLAR
   ===================================================== */

window.openCalculator =
    openCalculator;

window.closeCalculator =
    closeCalculator;

window.calculatePercentage =
    calculatePercentage;

window.calculateDiscount =
    calculateDiscount;

window.calculateVAT =
    calculateVAT;

window.calculateInstallment =
    calculateInstallment;

window.calculateFuel =
    calculateFuel;

window.calculateTravel =
    calculateTravel;

window.calculateRent =
    calculateRent;

window.calculateElectricity =
    calculateElectricity;
        