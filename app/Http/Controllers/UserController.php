<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    public function index()
    {
        $users = User::latest()->paginate(5);

        $users->getCollection()->transform(function ($user) {
            $user->added_at = $user->created_at->diffForHumans();
            $user->role_name =  $user?->roles?->pluck("name")?->implode(",");
            return $user;
        });

        return Inertia::render("Users/index", compact("users"));
    }
    public function create()
    {
        $roles = Role::all();
        return Inertia::render("Users/create", compact("roles"));
    }

    public function store(Request $request)
    {
        $validated_req = $request->validate([
            "name" => "required|string",
            "email" => "required|string|email|unique:users,email",
            "password" => "required|string",
            "password_confirmation" => "required|string|same:password",
            "role" => "required|exists:roles,name"
        ]);

        $validated_req["password"] = bcrypt($validated_req["password"]);


        unset($validated_req["password_confirmation"], $validated_req["role"]);

        $user = User::create($validated_req);
        if ($user) {
            $user->syncRoles($request->input("role"));
            return redirect()->route("users.index")->with("success", "User Created Successfully");
        } else {
            return back()->with("error", "Something went wrong While Creating User");
        }
    }



    public function edit(string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Something went wrong While Finding User");
        }


        $user = User::with('roles')->find($id);
        $user->role_name = $user->roles->pluck('name')->implode(',');


        if (empty($user)) {
            return back()->with("error", "Something went wrong While Finding User");
        }

        $roles = Role::all();



        return Inertia::render("Users/edit", compact("user", "roles"));
    }

    public function update(Request $request, string $id)
    {


        if (empty($id)) {
            return back()->with("error", "Something went wrong While Updating User");
        }

        $validated_req = $request->validate([
            "name" => "required|string",
            "email" => "required|string|email|unique:users,email," . $id,
            "role" => "required|exists:roles,name",
            "is_enabled" => "required|boolean",

        ]);

        unset($validated_req["role"]);

        $user = User::find($id);
        if (empty($user)) {
            return back()->with("error", "Something went wrong While Updating User");
        }


        if ($user->update($validated_req)) {
            $user->syncRoles($request->input("role"));
            return redirect()->route("users.index")->with("success", "User Updated Successfully");
        } else {
            return back()->with("error", "Something went wrong While Updating User");
        }
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Something went wrong While Finding User");
        }


        $user = User::find($id);
        if (empty($user)) {
            return back()->with("error", "Something went wrong While Finding User");
        }


        if ($user->delete()) {
            return redirect()->route("users.index")->with("success", "User Deleted Successfully");
        } else {
            return back()->with("error", "Something went wrong While Deleting User");
        }
    }

    public function deleteBySelection(Request $request)
    {

        $ids = $request->array("user_ids");

        if (count($ids) > 0 && !empty($ids)) {
            User::whereIn("id", $ids)->delete();
            return redirect()->route("users.index")->with("success", "Users Deleted Successfully");
        } else {
            return back()->with("error", "Something went wrong While Deleting Users");
        }
    }

    public function enable(Request $request)
    {
        $data = $request->array("data");
        $ids = $data["user_ids"];
        if (count($ids) > 0 && !empty($ids)) {
            User::whereIn("id", $ids)->update(["is_enabled" => true]);
            return redirect()->route("users.index")->with("success", "Selected Users Enabled Successfully");
        } else {
            return back()->with("error", "Something went wrong While Enabling Users");
        }
    }


    public function disable(Request $request)
    {
        $data = $request->array("data");
        $ids = $data["user_ids"];

        if (count($ids) > 0 && !empty($ids)) {
            User::whereIn("id", $ids)->update(["is_enabled" => false]);
            return redirect()->route("users.index")->with("success", "Selected Users Disabled Successfully");
        } else {
            return back()->with("error", "Something went wrong While Disabling Users");
        }
    }


    public function changePassword(string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Something went wrong While Finding User");
        }

        $user = User::find($id);

        if (empty($user)) {
            return back()->with("error", "Something went wrong While Finding User");
        }

        return Inertia::render("Users/changePassword", compact("user"));
    }

    public function updatePassword(Request $request, string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Something went wrong While Finding User");
        }

        $validated_req = $request->validate([
            'current_password' => "required|current_password",
            'password' => "required|min:8",
            'password_confirmation' => "required|same:password",
        ]);


        $user = User::find($id);
        if (empty($user)) {
            return back()->with("error", "Something went wrong While Finding User");
        }

        if ($user->update(["password" => bcrypt($validated_req["password"])])) {
            return redirect()->route("users.index")->with("success", "User Password Updated Successfully");
        } else {
            return back()->with("error", "Something went wrong While Updating User Password");
        }
    }
}
