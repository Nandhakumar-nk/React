import axios from "axios";

export async function post(endPoint, data) {
    let result;
    axios({
        method: 'post',
        url: "http://192.168.0.103:3030/" + endPoint,
        data
    }).then((response) => {
        console.log("post success");
        result = response.data;
    }).catch((error) => {
        console.log("post error");
        result = "Error";
    });;

    return result;
}

export async function get(endPoint) {
    let result;

    try {
        const response = await axios.get("http://192.168.0.103:3030/" + endPoint);
        console.log(response.data);
        console.log("get success");
        result = response.data;
    } catch (err) {
        console.log("error" + err);
        result = "error";
    }
    // axios.get("http://192.168.0.103:3030/" + endPoint).then((response) => {
    //     console.log("get success");
    //     return response.data;
    // }).catch((error) => {
    //     console.log("get error");
    //     return "Error";
    // });
    return result;
}