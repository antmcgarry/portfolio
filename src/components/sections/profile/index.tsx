import Image from "next/image";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import profileImage from "@/images/me.png";

const Profile = () => {
  return (
    <section>
      <div className="text-center">
        <h2 className="text-5xl text-teal-600 font-medium dark:text-teal-400 md:text-6xl">
          Anthony McGarry
        </h2>
        <h3 className="text-2xl py-2 dark:text-white md:text-3xl">
          Senior Front-End Developer
        </h3>
        <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
          I&apos;m a senior developer from Liverpool with 5 years of
          professional experience. A fast learner, self-motivated and problem
          solver.
        </p>
        <div className="text-5xl flex justify-center gap-8 text-gray-600 dark:text-gray-400">
          <a
            href="https://github.com/antmcgarry"
            rel="noreferrer"
            target="_blank"
            className="hover:text-gray-200"
          >
            <AiFillGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/anthony-mcgarry-a28a68ab/"
            rel="noreferrer"
            target="_blank"
            className="hover:text-gray-200"
          >
            <AiFillLinkedin />
          </a>
        </div>
        <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 relative overflow-hidden mt-10 md:h-96 md:w-96">
          <Image src={profileImage} alt="picture of the auth" priority fill />
        </div>
      </div>
    </section>
  );
};

export default Profile;
