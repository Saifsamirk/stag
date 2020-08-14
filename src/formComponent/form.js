import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import stag from "./assets/stag.png"
import "./style.scss";

function FormComponent() {

    const [isShow, setShow] = useState(false);
    const [isValidate, setValidate] = useState(false);
    const [isError, setError] = useState(false);
    const [form, setForm] = useState({
        space: 0,
        angle: 0,
        width: 0,
        height: 0
    })

    const [numOfUnits, setNumber] = useState("");
    const [spaceBetween, setSpace] = useState("");
    const [unitAndWall, setUnitWall] = useState("");
    const [amountOfLight, setAmountLight] = useState("");

    function validation() {
        if (form.space && form.angle && form.width && form.height) {
            setValidate(true);
            setError(false);
        }
        else {
            setValidate(false);
            setError(true);
        }
    }

    function clearValues() {
        setForm({
            ...form,
            space: "",
            angle: "",
            width: "",
            height: ""
        })
        setNumber("");
        setSpace("");
        setUnitWall("");
        setAmountLight("");
    }

    function calculateResults() {
    }

    const setFormValue = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = () => {
        clearValues();
        validation()
        calculateResults();

        const result1 = ((parseInt(form.height) / parseInt(form.angle)) * (parseInt(form.width) / parseInt(form.angle)));
        const flooredResult1 = Math.round(result1);
        setNumber(flooredResult1)

        const result2 = (parseInt(form.height) * parseInt(form.angle)) / (parseInt(form.height));
        const flooredResult2 = Math.round(result2);
        setSpace(flooredResult2);

        setUnitWall(flooredResult2 / 2);

        const result3 = ((parseInt(form.height) * parseInt(form.width) * parseInt(form.space * 1.2)) / (flooredResult1));
        const flooredResult3 = Math.round(result3);
        setAmountLight(flooredResult3);

        setShow(true);
    }

    return (
        <div id="main-form">
            <div className="main">
                <div className="container">
                    <img alt="logo" src={stag} />
                    <div className="form-wrapper">
                        {isError && <Alert>الرجاء ادخال جميع القيم لامكانية اظهار النتائج</Alert>}
                        <Form>
                            <FormGroup>
                                <Label>نوع الفراغ</Label>
                                <Input type="select" name="space" value={form.space} onChange={(e) => setFormValue(e)}>
                                    <option>اختر نوع الفراغ</option>
                                    <option value="200">معيشة</option>
                                    <option value="400">مطبخ</option>
                                    <option value="200">حمام</option>
                                    <option value="100">ممر</option>
                                    <option value="500">محل</option>
                                    <option value="800">غرفة عمليات</option>
                                    <option value="400">مكتب</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>زاوية السقوط</Label>
                                <Input type="select" name="angle" value={form.angle} onChange={(e) => setFormValue(e)}>
                                    <option>اختر زاوية السقوط</option>
                                    <option value="0.85">١٥ درجة</option>
                                    <option value="1.35">٢٤ درجة</option>
                                    <option value="2">٣٦ درجة</option>
                                    <option value="2.55">٤٥ درجة</option>
                                    <option value="3.5">٦٠ درجة</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>طول الفراغ</Label>
                                <Input type="number" name="width" placeholder="الطول بالمتر" value={form.width} onChange={(e) => setFormValue(e)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>عرض الفراغ</Label>
                                <Input type="number" name="height" placeholder="العرض بالمتر" value={form.height} onChange={(e) => setFormValue(e)} />
                            </FormGroup>
                        </Form>
                        <Button type="button" onClick={handleSubmit}>اظهار النتائج</Button>
                        {isShow && isValidate &&
                            <div className="result-wrapper">
                                <h3>النتائج المطلوبة</h3>
                                <div>- عدد وحدات الاضاءة : {numOfUnits} وحده</div>
                                <div>- التوزيع الصحيح</div>
                                <ul>
                                    <li className="indented-input">المسافة بين كل وحدة اضاءة : {spaceBetween} متر</li>
                                    <li className="indented-input">المسافة بين وحدة الاضاءة والجدار : {unitAndWall} متر</li>
                                </ul>
                                <div>- مقدار الضوء الكافي : ({amountOfLight}) لومن</div>
                            </div>
                        }
                    </div>
                </div>
                <a href="https://www.facebook.com/stagarchitects" rel="noopener noreferrer" target="_blank">Visit Our Facebook Page</a>
            </div>
        </div>
    )
}

export default FormComponent; 