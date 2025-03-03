import {Tabs} from 'antd';
import './CustomTabs.css'; // وارد کردن فایل CSS سفارشی

const {TabPane} = Tabs;

const CustomTabs = () => {
    return (
        <Tabs className="custom-tabs">
            <TabPane tab="تب ۱" key="1">
                محتوای تب ۱
            </TabPane>
            <TabPane tab="تب ۲" key="2">
                محتوای تب ۲
            </TabPane>
        </Tabs>
    );
};

export default CustomTabs;