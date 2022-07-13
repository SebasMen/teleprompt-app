import React, { useEffect, useState } from "react";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
  // DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { useRef } from "react";

const REGION = "us-east-2";

const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: "us-east-2:d741c7c2-63e3-440a-a963-642a7c17d304",
  }),
});

const albumBucketName = "story-amplify";

const UploadVideo = () => {
  const fileRef = useRef();
  const [videos, setVideos] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    listAlbums();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listAlbums = async () => {
    try {
      const data = await s3.send(
        new ListObjectsCommand({ Delimiter: "/", Bucket: albumBucketName })
      );

      if (data.CommonPrefixes === undefined) {
        return alert("You don't have any albums. You need to create an album.");
      } else {
        let prefix = "";
        let albumName = "";
        let albumNames = [];

        data.CommonPrefixes.map(
          (e) => (
            // eslint-disable-next-line no-sequences
            (prefix = e.Prefix),
            (albumName = decodeURIComponent(prefix.replace("/", ""))),
            albumNames.push(albumName)
          )
        );

        setAlbums(albumNames);
        console.log(albums);
      }
    } catch (err) {
      return alert("There was an error listing your albums: " + err.message);
    }
  };

  const viewAlbum = async (albumName) => {
    const albumPhotosKey = encodeURIComponent(albumName) + "/";
    try {
      const data = await s3.send(
        new ListObjectsCommand({
          Prefix: albumPhotosKey,
          Bucket: albumBucketName,
        })
      );
      if (data.Contents.length === 1) {
        return alert(
          "You don't have any photos in this album. You need to add photos."
        );
      } else {
        console.log(data);
        const href = "https://s3." + REGION + ".amazonaws.com/";
        const bucketUrl = href + albumBucketName + "/";
        let photoKey = "";
        let photoUrl = "";
        let videosUrl = [];

        data.Contents.map(
          (photo) => (
            // eslint-disable-next-line no-sequences
            (photoKey = photo.Key),
            (photoUrl = bucketUrl + encodeURIComponent(photoKey)),
            videosUrl.push({
              url: photoUrl,
              key: photoKey,
              albumName: albumName,
            })
          )
        );
        setVideos(videosUrl);
        console.log(videosUrl);
      }
    } catch (err) {
      return alert("There was an error viewing your album: " + err.message);
    }
  };

  const addPhoto = async (albumName) => {
    const files = fileRef.current.files;
    try {
      const albumPhotosKey = encodeURIComponent(albumName) + "/";
      // eslint-disable-next-line no-unused-vars
      const data = await s3.send(
        new ListObjectsCommand({
          Prefix: albumPhotosKey,
          Bucket: albumBucketName,
        })
      );
      const file = files[0];
      const fileName = file.name;
      const photoKey = albumPhotosKey + fileName;
      const uploadParams = {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file,
      };
      try {
        // eslint-disable-next-line no-unused-vars
        const data = await s3.send(new PutObjectCommand(uploadParams));
        alert("Successfully uploaded photo.");
        viewAlbum(albumName);
      } catch (err) {
        return alert("There was an error uploading your photo: ", err.message);
      }
    } catch (err) {
      if (!files.length) {
        return alert("Choose a file to upload first.");
      }
    }
  };

  const deletePhoto = async (albumName, photoKey) => {
    try {
      console.log(photoKey);
      const params = { Key: photoKey, Bucket: albumBucketName };
      // eslint-disable-next-line no-unused-vars
      const data = await s3.send(new DeleteObjectCommand(params));
      console.log("Successfully deleted photo.");
      viewAlbum(albumName);
    } catch (err) {
      return alert("There was an error deleting your photo: ", err.message);
    }
  };

  return (
    <div>
      <h1>Carga de archivos a AWS S3</h1>

      <div style={{ display: "flex" }}>
        {videos &&
          videos.map((e) => (
            <div key={e.key}>
              <figure style={{ width: "300px" }}>
                <video
                  src={e.url}
                  alt={e.key}
                  style={{ width: "100%" }}
                  controls
                ></video>
              </figure>
              <button
                type="button"
                onClick={() => deletePhoto(e.albumName, e.key)}
              >
                delete
              </button>
            </div>
          ))}
      </div>

      <input type="file" ref={fileRef} />
      <button type="button" onClick={() => addPhoto(albums[1])}>
        Subir foto
      </button>
    </div>
  );
};

export default UploadVideo;
