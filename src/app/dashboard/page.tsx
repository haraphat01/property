"use client"
import { Form, Input, Upload, Button, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { Option } = Select;


const Dashboard = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);


    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleRemove = (file) => {
        const newFileList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(newFileList);
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        return isImage;
    };


    const onFinish = async () => {
        const formValues = form.getFieldsValue();
        const imageUrls = fileList.map(file => {
            // If the file has a response and URL, it's been uploaded
            if (file.response && file.response.url) {
                return file.response.url;
            }
            // If the file is local and hasn't been uploaded, use the local preview URL
            // Note: This assumes you're using a file reader or similar approach to generate previews
            else if (file.thumbUrl) {
                return file.thumbUrl;
            }
            // If using object URLs for local files (not yet uploaded)
            else if (file.originFileObj) {
                return URL.createObjectURL(file.originFileObj);
            }
            return null; // Return null if no URL is available
        }).filter(url => url != null); // Filter out any null values


        // Prepare data to send to API
        const requestData = {
            ...formValues,
            imageUrls: imageUrls,
        };
        console.log(requestData)

        const apiUrl = '/api/generateDescriptionApi'; // Your API route URL
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const result = await response.json();
                // Handle the response as needed
            } else {
                console.error('Failed to send data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <div className="div">
            <div className="property-form flex items-center justify-center">

                <Form
                    form={form}
                    name="upload_property"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ remember: true }}
                    className="w-full sm:w-1/2"
                >

                    <Form.Item
                        name="images"
                        label={<label className="whiteLabel">Upload Property Images</label>}
                        rules={[{ required: true, message: 'Please upload property images!' }]}
                    >
                        <Upload
                            fileList={fileList}
                            onChange={handleUploadChange}
                            onRemove={handleRemove}
                            beforeUpload={beforeUpload}
                            multiple
                            listType="picture-card" // To display images in a card format
                            maxCount={5} // Maximum number of images allowed
                            accept="image/*" // Restrict accepted file types to images
                            showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }} // Show preview and remove icons
                            maxFileSize={5 * 1024 * 1024} // 5MB maximum file size
                        >
                            <Button icon={<UploadOutlined />} className="whiteLabel">Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="propertyType"

                        label={<label className="whiteLabel">Property Type</label>}
                        rules={[{ required: true, message: 'Please select property type!' }]}
                    >
                        <Select placeholder="Select Property Type">
                            <Option value="apartment">Apartment</Option>
                            <Option value="house">House</Option>
                            <Option value="commercial">Commercial Space</Option>
                            <Option value="land">Land</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label={<label className="whiteLabel">Location</label>}
                        rules={[{ required: true, message: 'Please input property location!' }]}
                    >
                        <Input placeholder="Enter Property Location" />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <Input.TextArea placeholder="Enter Property Description" rows={4} />
                    </Form.Item>



                    <Form.Item>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );

}
export default Dashboard