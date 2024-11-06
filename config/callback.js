const axios = require("axios");

const client_id = "899fdd497e454aadbfc44d35a1626aed";
const client_secret = "15d10af019e5442e9ddf696620099290";
const url_redirect = "http://localhost:8000/api/callback"; // URL ของ callback
const oauth_scope = "basic";
const AUTHORIZATION_ENDPOINT = "https://account.nrru.ac.th/auth/authorize.aspx"; // ใส่ URL Authorization
const TOKEN_ENDPOINT = "https://account.nrru.ac.th/auth/api/token"; // ใส่ URL Token
const USERINFO_ENDPOINT = "https://account.nrru.ac.th/auth/api/me"; // ใส่ URL Userinfo

exports.callback = async (req, res) => {
  if (req.query.error) {
    return res.send(
      `Error: ${req.query.error}, Description: ${req.query.error_description}`
    );
  }
  const code = req.query.code;

  if (code) {
    try {
      const accessToken = await get_oauth_token(code);
      const response = await axios.get(USERINFO_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "no-cache",
        },
      });
      const userInfo = response.data;

      res.send(`
        Name: ${userInfo.first_name}<br>
        Surname: ${userInfo.last_name}<br>
        Organization: ${userInfo.company}<br>
      `);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  } else {
    res.redirect(
      `${AUTHORIZATION_ENDPOINT}?response_type=code&client_id=${client_id}&redirect_uri=${url_redirect}&scope=${oauth_scope}`
    );
  }
};

async function get_oauth_token(code) {
  const params = new URLSearchParams();
  params.append("code", code);
  params.append("client_id", client_id);
  params.append("client_secret", client_secret);
  params.append("redirect_uri", url_redirect);
  params.append("grant_type", "authorization_code");

  try {
    const response = await axios.post(TOKEN_ENDPOINT, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.log("Error fetching access token", error);
    throw new Error("Failed to get access token");
  }
}
