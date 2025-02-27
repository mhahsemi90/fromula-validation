import BlockType from "./BlockType.js";

const ResultVarNameList = [
    {
        type: BlockType.NUMBER_VARIABLE,
        code: '_result',
        enTitle: 'result',
        title: 'مقدار بازگشتی'
    }
]
const OperandsMainList = [
    {
        code: "Personnel Info",
        title: "اطلاعات پرسنلی",
        enTitle: "Personnel Info",
        items: [
            {
                type: BlockType.VARIABLE,
                code: "childCount",
                enTitle: "Children Count",
                title: "تعداد فرزند"
            },
            {
                type: BlockType.VARIABLE,
                code: "educationCount",
                enTitle: "Education Count",
                title: "تعداد دوره آموزشی"
            },
            {
                type: BlockType.FUNCTION,
                code: "educationTimeTotal",
                enTitle: "Education Time Total",
                title: "ساعات دوره آموزشی"
            },
            {
                type: BlockType.FUNCTION,
                code: "lastEducationDegree",
                enTitle: "Last Education Degree",
                title: "آخرین مدرک تحصیلی"
            },
        ]
    },
    {
        code: "Payroll Info",
        title: "اطلاعات حقوقی",
        enTitle: "Payroll Info",
        items: [
            {
                type: BlockType.VARIABLE,
                code: "childAmount",
                enTitle: "Children Amount",
                title: "حق اولاد"
            },
            {
                type: BlockType.VARIABLE,
                code: "housingAmount",
                enTitle: "Housing Amount",
                title: "حق مسکن"
            },
            {
                type: BlockType.VARIABLE,
                code: "baseAmount",
                enTitle: "Base Amount",
                title: "حقوق پایه"
            },
            {
                type: BlockType.VARIABLE,
                code: "yearsAmount",
                enTitle: "Years Amount",
                title: "سنوات"
            },
        ]
    },
    {
        code: "Finance Info",
        title: "اطلاعات مالی",
        enTitle: "Finance Info",
        items: [
            {
                type: BlockType.VARIABLE,
                code: "bankAccount",
                enTitle: "Bank Account",
                title: "شماره حساب"
            },
            {
                type: BlockType.VARIABLE,
                code: "insuranceNumber",
                enTitle: "Insurance Number",
                title: "شماره بیمه"
            },
            {
                type: BlockType.VARIABLE,
                code: "salaryDegree",
                enTitle: "Salary Degree",
                title: "درجه مالیاتی"
            },
        ]
    },
    {
        code: "TimeSheet Info",
        title: "اطلاعات تردد",
        enTitle: "TimeSheet Info",
        items: [
            {
                type: BlockType.FUNCTION,
                code: "workedTimeTotal",
                enTitle: "WorkedTime Total",
                title: "کل ساعات کاری"
            },
            {
                type: BlockType.FUNCTION,
                code: "addedWorkedTimeTotal",
                enTitle: "Added WorkedTime Total",
                title: "کل اضافه کاری"
            },
            {
                type: BlockType.FUNCTION,
                code: "extraTime",
                enTitle: "Extra Time",
                title: "اضافه کاری"
            },
            {
                type: BlockType.VARIABLE,
                code: "baseDegree",
                enTitle: "Base Degree",
                title: "درجه پایه"
            },
            {
                type: BlockType.FUNCTION,
                code: "weekendWorkTime",
                enTitle: "Weekend Work Time",
                title: "ساعات اضافه کاری آخر هفته"
            },
            {
                type: BlockType.FUNCTION,
                code: "weekendWorkTime2",
                enTitle: "Weekend Work Time2",
                title: "ساعات اضافه کاری آخر هفته2"
            },
            {
                type: BlockType.FUNCTION,
                code: "weekendWorkTime2",
                enTitle: "Weekend Work Time2",
                title: "ساعات اضافه کاری آخر هفته2"
            },
        ]
    },
    {
        code: "Education Info",
        title: "اطلاعات آموزشی",
        enTitle: "Education Info",
        items: [
            {
                type: BlockType.VARIABLE,
                code: "degreeLevel",
                enTitle: "Degree Level",
                title: "سطح آموزشی"
            },
            {
                type: BlockType.VARIABLE,
                code: "universityName",
                enTitle: "University Name",
                title: "نام دانشگاه"
            },
            {
                type: BlockType.VARIABLE,
                code: "schoolName",
                enTitle: "School Name",
                title: "نام مدرسه"
            },
            {
                type: BlockType.VARIABLE,
                code: "lastEducationDegree",
                enTitle: "Last Education Degree",
                title: "آخرین مدرک تحصیلی"
            },
        ]
    },
    {
        code: "Functional Info",
        title: "اطلاعات کارکردی",
        enTitle: "Functional Info",
        items: [
            {
                type: BlockType.VARIABLE,
                code: "jobName",
                enTitle: "Job Name",
                title: "عنوان شغل"
            },
            {
                type: BlockType.VARIABLE,
                code: "postName",
                enTitle: "Post Name",
                title: "عنوان پست"
            },
            {
                type: BlockType.VARIABLE,
                code: "organizationName",
                enTitle: "Organization Name",
                title: "عنوان واحد سازمانی"
            },
        ]
    },
    {
        code: "Functions",
        title: "توابع",
        enTitle: "Functions",
        items: [
            {
                type: BlockType.FUNCTION,
                code: "round",
                enTitle: "Round",
                title: "رند"
            },
            {
                type: BlockType.FUNCTION,
                code: "maxValue",
                enTitle: "Max Value",
                title: "مقدار حداکثر"
            },
            {
                type: BlockType.FUNCTION,
                code: "minValue",
                enTitle: "Min Value",
                title: "مقدار حداقل"
            },
            {
                type: BlockType.FUNCTION,
                code: "averageValue",
                enTitle: "Average Value",
                title: "مقدار متوسط"
            },
        ]
    },
]
export {OperandsMainList, ResultVarNameList};