#include <zmq.hpp>
#include <string>
#include <chrono>
#include <thread>
#include <iostream>
#include <random>
#include <functional>

auto distribution(double mean, double sd) -> std::function<double()> {
    auto randomizer = std::default_random_engine(std::random_device{}());
    auto normal = std::normal_distribution<>(mean, sd);

    return [normal, randomizer]() mutable {
        return normal(randomizer);
    };
}

auto main(int argc, char* argv[]) -> int {
    using namespace std::chrono_literals;
    using namespace std::string_literals;

    if (argc == 1) {
        std::cout << "Usage: sensor <target_zone>" << std::endl;
    } 
    else {
        std::cout << "Reading sensor...\n" << std::endl;
    
        auto id = std::string(argv[1]);
        auto flow = distribution(50, 2);
        auto status = "OK"s;
         
        auto context = zmq::context_t(1);
        auto publisher = zmq::socket_t(context, zmq::socket_type::pub);
        publisher.connect("tcp://localhost:5559");

        while (true) {
            auto msg = "{\n id: "s+id+",\n flow: "+std::to_string(flow())+",\n status: "+status+" \n}";

            std::cout << msg << std::endl << std::endl;
            publisher.send(zmq::buffer(msg), zmq::send_flags::none);

            std::this_thread::sleep_for(1500ms);
        }
    }

    return 0;
}
