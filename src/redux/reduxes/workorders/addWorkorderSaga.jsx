// import { call, put, takeEvery } from 'redux-saga/effects'
// import instance from "../../../api/api_instance";

// async function getApi(data) {
//     const formData = {
//         title: data.title,
//         work_order_number: data.work_order_number,
//     }
//     try {
//         const result = instance({
//             url: "/work_order",
//             method: "POST",
//             data: formData,
//         }).then((response) => {
//             return response;
//         })
//         return await result;
//     } catch (error) {
//         throw error;
//     }
// }

// function* addWorkorder(action) {
//     try {
//         const res = yield call(getApi, action.payload);
//         yield put({ type: "ADD_WORKORDER_SUCCESS", allWorkordersList: res.data });
//         window.location.href = "/active-workorders"
//     } catch (e) {
//         if (e.response.status == 422) {
//             yield put({ type: "ADD_WORKORDER_FAILED", message: e.response.data });
//         } else if (e.response.status === 406 || e.response.status === 404) {
//             yield put({ type: "ADD_WORKORDER_FAILED", message: e.response.data });
//         } else {
//             yield put({ type: "ADD_WORKORDER_FAILED", message: null });
//         }
//     }
// }

// function* addWorkorderSaga() {
//     yield takeEvery("ADD_WORKORDER_REQUESTED", addWorkorder);
// }

// export default addWorkorderSaga;