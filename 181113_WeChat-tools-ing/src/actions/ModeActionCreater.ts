/**
 * ModeActionCreater
 */
interface I_params {
  type?: string;
  mode?: string;
}

export default (params: I_params = {}) => (
  dispatch: (params: I_params) => void,
  getState: () => void
) => {
  dispatch(params);
};
