import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Button, Input } from '../components';
import images from '../assets';
import { NFTContext } from '../context/NFTContext';

const CreateNFT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [FormInput, setFormInput] = useState({ price: '', name: '', description: '' });
  const theme = useTheme();
  const { uploadToIPFS } = useContext(NFTContext);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);

    console.log({ url });
    setFileUrl(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(() => (
    `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive && 'border-file-active'}
    ${isDragAccept && 'border-file-accept'}
    ${isDragReject && 'border-file-reject'}`
  ), []);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold   sm:mb-4">Create new NFT</h1>

        <div className="mt-16 ">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload File</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">JPG, PNG, GIF, SVG, WEBM. Max 100mb.</p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Drag and Drop File.</p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Or browse media on you device</p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleClick={(e) => setFormInput({ ...FormInput, name: e.target.value })}
        /><Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Desription"
          handleClick={(e) => setFormInput({ ...FormInput, name: e.target.description })}
        /><Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setFormInput({ ...FormInput, name: e.target.price })}
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Create NFT"
            classStyles="rounded-xl"
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
